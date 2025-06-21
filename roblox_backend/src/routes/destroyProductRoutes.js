const express = require('express');
const router = express.Router();
const destroyProductController = require('../controllers/destroyProductController');

router.delete('/delete-product', destroyProductController.deleteProduct);

module.exports = router;
