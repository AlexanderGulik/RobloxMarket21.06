const db = require('../config/dbConfig');

/**
 * Поиск user_id по username
 */
const findUserIdByUsername = async (username) => {
  if (!username) return null;

  const [rows] = await db.execute('SELECT user_id FROM User WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0].user_id : null;
};

/**
 * Поиск product_id по названию
 */

const findProductIdByName = async (name) => {
  const query = `SELECT product_id FROM Product WHERE name = ?`;
  try {
    const [results] = await db.execute(query, [name]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Ошибка базы данных при проверке имени продукта:', err);
    throw err;
  }
};

/**
 * Создание заказа
 */
const createOrder = async (orderData, cart) => {
  try {
    // Начинаем транзакцию
    await db.query('START TRANSACTION');

    // Ищем user_id по username
    const userId = await findUserIdByUsername(orderData.username);

    // Вставляем основную информацию о заказе
    const [orderResult] = await db.execute(
      `
            INSERT INTO Orders (
                order_id,
                payment_id,
                user_id,
                telegram_name,
                roblox_name,
                phone_number,
                amount,
                status,
                created_at,
                updated_at,
                order_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(),NOW(), ?)
        `,
      [
        orderData.orderId,
        orderData.paymentId,
        userId,
        orderData.telegramName,
        orderData.robloxName,
        orderData.phoneNumber,
        orderData.amount,
        orderData.status,
        orderData.orderType,
      ]
    );

    // Вставляем информацию о товарах заказа
    if (cart && cart.products && cart.products.length > 0) {
      for (const item of cart.products) {
        // Ищем product_id по названию
        const { product_id } = await findProductIdByName(item.name);

        if (!product_id) {
          throw new Error(`Продукт с названием "${item.name}" не найден`);
        }

        // Сначала получаем полную информацию о продукте из таблицы Product
        const [productData] = await db.execute(
          `SELECT name, image, oldCost, cost, category_id 
           FROM Product 
           WHERE product_id = ?`,
          [product_id]
        );

        // Проверяем, что продукт найден
        if (!productData || productData.length === 0) {
          throw new Error(`Продукт с ID ${product_id} не найден`);
        }

        const product = productData[0];

        // Теперь вставляем данные в Order_Items с полной информацией о продукте
        await db.execute(
          `
          INSERT INTO Order_Items (
            order_id,
            quantity,
            price,
            amount,
            name,
            image,
            oldCost,
            cost,
            category_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            orderData.orderId,
            item.quantity,
            item.price,
            item.amount,
            product.name,
            product.image,
            product.oldCost,
            product.cost,
            product.category_id,
          ]
        );
      }
    }

    // Подтверждаем транзакцию
    await db.query('COMMIT');

    return orderResult;
  } catch (error) {
    // Откатываем транзакцию в случае ошибки
    await db.query('ROLLBACK');
    console.error('Ошибка при создании заказа:', error);
    throw error;
  }
};

module.exports = {
  createOrder,
  findUserIdByUsername,
};
