const db = require('../config/dbConfig');

/**
 * Обновление статуса заказа
 */
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const [orders] = await db.execute('SELECT order_id, status FROM Orders WHERE order_id = ?', [orderId]);

    if (orders.length === 0) {
      throw new Error('Заказ не найден');
    }

    const [result] = await db.execute(
      `UPDATE Orders 
             SET status = ?, updated_at = NOW() 
             WHERE order_id = ?`,
      [newStatus, orderId]
    );

    if (result.affectedRows === 0) {
      throw new Error('Не удалось обновить статус заказа');
    }

    console.log({
      success: true,
      message: 'Статус заказа успешно обновлен',
      oldStatus: orders[0].status,
      newStatus: newStatus,
    });
  } catch (error) {
    console.error('Ошибка при обновлении статуса заказа:', error);
    throw error;
  }
};

module.exports = {
  updateOrderStatus,
};
