const orderModel = require('../models/orderModel');

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;

    const result = await orderModel.getOrdersByUserId(userId, parseInt(page), parseInt(limit), status);

    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    res.status(500).json({
      message: 'Ошибка при получении заказов',
    });
  }
};

const getIncomingOrders = async (req, res) => {
  try {
    const { page = 1, limit = 25 } = req.query;

    const result = await orderModel.getIncomingOrders(parseInt(page), parseInt(limit));

    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка при получении входящих заказов:', error);
    res.status(500).json({
      message: 'Ошибка при получении входящих заказов',
    });
  }
};

const getArchiveOrders = async (req, res) => {
  try {
    const { page = 1, limit = 25 } = req.query;

    const result = await orderModel.getArchiveOrders(parseInt(page), parseInt(limit));

    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка при получении входящих заказов:', error);
    res.status(500).json({
      message: 'Ошибка при получении архивных заказов',
    });
  }
};

const changeOrderTypeById = async (req, res) => {
  try {
    const { orderId, orderType } = req.body;
    const result = await orderModel.changeOrderTypeById(orderId, orderType);
    res.status(200).json(result);
  } catch (error) {
    console.error('Ошибка при изменении типа заказа:', error);
    res.status(500).json({
      message: 'Ошибка при изменении типа заказа',
    });
  }
};

module.exports = {
  getOrders,
  getIncomingOrders,
  getArchiveOrders,
  changeOrderTypeById,
};
