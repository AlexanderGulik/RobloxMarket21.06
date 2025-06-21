const crypto = require('crypto');
const axios = require('axios');
const { createOrder } = require('../models/createOrderModel');
const db = require('../config/dbConfig');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

/**
 * Создание токена для запроса к Tinkoff
 */
const createToken = (paymentData) => {
  const data = { ...paymentData };

  data.Password = process.env.TINKOFF_SECRET_KEY;

  const sortedKeys = Object.keys(data).sort();
  const concatenatedString = sortedKeys
    .filter((key) => key !== 'Token' && key !== 'DATA' && key !== 'Receipt' && data[key] !== null && data[key] !== '')
    .map((key) => data[key].toString())
    .join('');

  return crypto.createHash('sha256').update(concatenatedString).digest('hex');
};

/**
 * Инициализация платежа
 */
const initializePayment = async (req, res) => {
  try {
    const { cart, user, formData } = req.body;

    if (!cart?.products?.length || !formData) {
      return res.status(400).json({
        error: 'Некорректный запрос',
        message: 'Отсутствуют необходимые данные для создания платежа',
      });
    }

    if (!cart.amount || cart.amount < 50) {
      return res.status(400).json({
        error: 'Некорректная сумма',
        message: 'Минимальная сумма заказа - 50 рублей',
      });
    }

    const productNames = cart.products.map((p) => p.name);
    const [dbProducts] = await db.query('SELECT product_id, name, cost FROM Product WHERE name IN (?)', [productNames]);

    const productMap = {};
    dbProducts.forEach((p) => {
      productMap[p.name] = {
        id: p.product_id,
        price: parseFloat(p.cost),
      };
    });

    let calculatedCartAmount = 0;

    for (const product of cart.products) {
      if (!product.name || !productMap[product.name]) {
        return res.status(400).json({
          message: `Продукт "${product.name || ''}" не найден. Пожалуйста, обновите корзину.`,
        });
      }

      const dbProduct = productMap[product.name];

      const productPrice = parseFloat(product.price);
      if (Math.abs(productPrice - dbProduct.price) > 0.01) {
        return res.status(400).json({
          message: `Цена товара ${product.name} изменилась (текущая цена: ${dbProduct.price}). Пожалуйста, обновите корзину.`,
        });
      }

      const quantity = parseInt(product.quantity);
      if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
        return res.status(400).json({
          message: `Некорректное количество для товара ${product.name}`,
        });
      }

      const correctAmount = parseFloat((dbProduct.price * quantity).toFixed(2));
      calculatedCartAmount += correctAmount;
    }

    calculatedCartAmount = parseFloat(calculatedCartAmount.toFixed(2));
    if (Math.abs(parseFloat(cart.amount) - calculatedCartAmount) > 0.01) {
      return res.status(400).json({
        message: `Общая сумма корзины (${cart.amount}) не соответствует расчетной сумме товаров (${calculatedCartAmount}). Пожалуйста, обновите корзину.`,
      });
    }

    const orderId = uuidv4();

    const paymentData = {
      TerminalKey: process.env.TINKOFF_TERMINAL_KEY,
      Amount: Math.round(cart.amount * 100),
      OrderId: orderId,
      Description: cart.products
        .map((product) => product.name)
        .join('; ')
        .slice(0, 240),
      NotificationURL: process.env.TINKOFF_NOTIFICATION_URL,
      SuccessURL: process.env.TINKOFF_SUCCESS_URL,
      FailURL: process.env.TINKOFF_FAIL_URL,
      DATA: {
        Telegram: formData.telegram,
        Roblox: formData.roblox,
        Phone: formData.phone,
        Email: user?.email || '',
        Username: user?.username || '',
      },
      Receipt: {
        Phone: formData.phone,
        Email: user?.email || '',
        Taxation: 'usn_income',
        FfdVersion: '1.2',
        Items: cart.products.map((item) => ({
          Name: item.name,
          Quantity: item.quantity,
          Amount: Math.round(item.amount * 100),
          Price: Math.round(item.price * 100),
          Tax: 'vat0',
          PaymentMethod: 'full_prepayment',
          PaymentObject: 'service',
          MeasurementUnit: 'piece',
        })),
      },
    };

    paymentData.Token = createToken(paymentData);

    const response = await axios.post('https://securepay.tinkoff.ru/v2/Init', paymentData);

    console.log('Ответ от Tinkoff:', response.data);

    if (response.data.Success) {
      const orderData = {
        orderId: orderId,
        paymentId: response.data.PaymentId,
        username: user?.username,
        telegramName: formData.telegram,
        robloxName: formData.roblox,
        phoneNumber: formData.phone,
        amount: cart.amount,
        status: response.data.Status,
        orderType: 'Входящий',
      };

      await createOrder(orderData, cart);

      return res.json({
        success: true,
        PaymentURL: response.data.PaymentURL,
        orderId: orderId,
      });
    }
  } catch (error) {
    console.error('Ошибка при создании платежа:', error);
    return res.status(500).json({
      error: 'Ошибка при создании платежа',
      message: 'Ошибка при создании платежа',
    });
  }
};

module.exports = {
  initializePayment,
};
