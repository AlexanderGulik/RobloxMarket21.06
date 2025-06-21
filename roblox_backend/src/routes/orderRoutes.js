const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/income-orders', orderController.getIncomingOrders);
router.get('/archive-orders', orderController.getArchiveOrders);
router.put('/change-order-type', orderController.changeOrderTypeById);

module.exports = router;
