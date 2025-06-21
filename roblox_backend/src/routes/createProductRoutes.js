const express = require('express');
const router = express.Router();
const createProductController = require('../controllers/createProductController');
const { upload, handleMulterError } = require('../config/multerConfig');

router.post('/create-product', upload.single('image'), handleMulterError, createProductController.createProduct);

module.exports = router;
