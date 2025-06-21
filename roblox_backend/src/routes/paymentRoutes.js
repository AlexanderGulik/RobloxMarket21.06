const express = require('express');
const router = express.Router();
const paymentNotificationController = require('../controllers/paymentNotificationController');
const paymentInitController = require('../controllers/paymentInitController');

router.post('/notification', paymentNotificationController.handleTinkoffNotification);
router.post('/init', paymentInitController.initializePayment);

module.exports = router;
