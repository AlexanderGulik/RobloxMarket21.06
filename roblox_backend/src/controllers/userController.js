const db = require('../config/dbConfig');
const orderModel = require('../models/orderModel');

async function getUserProfileWithOrders(req, res) {
  const userId = req.user.id;
  const { page = 1, limit = 2 } = req.query;

  try {
    const [rows] = await db.execute('SELECT user_id, username, email, roles FROM User WHERE user_id = ?', [userId]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const orders = await orderModel.getOrdersByUserId(userId, parseInt(page), parseInt(limit));

    res.status(200).json({
      user,
      orders: orders.orders,
      pagination: {
        total: orders.total,
        currentPage: orders.currentPage,
        totalPages: orders.totalPages,
        limit: orders.limit,
      },
    });
  } catch (err) {
    console.error('Ошибка при получении данных пользователя:', err);
    res.status(500).json({
      message: 'Ошибка сервера при получении данных пользователя',
      error: err.message,
    });
  }
}

module.exports = { getUserProfileWithOrders };
