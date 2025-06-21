const crypto = require('crypto');
require('dotenv').config();
const { updateOrderStatus } = require('../models/orderStatusUpdate');

/**
 * Проверка подписи запроса от Tinkoff
 */
const verifyTinkoffSignature = (data, receivedToken) => {
  const password = process.env.TINKOFF_SECRET_KEY;
  if (!password) {
    throw new Error('Не настроен TINKOFF_SECRET_KEY');
  }

  const dataWithPassword = {
    ...data,
    Password: password,
  };

  delete dataWithPassword.Token;

  const sortedFields = Object.keys(dataWithPassword)
    .filter((key) => dataWithPassword[key] !== null && dataWithPassword[key] !== '')
    .sort();

  const concatenatedString = sortedFields.map((key) => dataWithPassword[key]).join('');

  const token = crypto.createHash('sha256').update(concatenatedString).digest('hex');

  return token === receivedToken;
};

/**
 * Обработка уведомления от Tinkoff
 */
const handleTinkoffNotification = async (req, res) => {
  try {
    console.log('Получено уведомление от Tinkoff:', req.body);

    if (!verifyTinkoffSignature(req.body, req.body.Token)) {
      console.error('Неверная подпись запроса');
      return res.status(403);
    }

    if (req.body.TerminalKey !== process.env.TINKOFF_TERMINAL_KEY) {
      console.error('Неверный Terminal Key');
      return res.status(403);
    }

    const { OrderId, Status } = req.body;

    await updateOrderStatus(OrderId, Status);

    console.log('Статус обновлен');
    return res.status(200).send('OK');
  } catch (error) {
    return res.status(500);
  }
};

module.exports = {
  handleTinkoffNotification,
};
