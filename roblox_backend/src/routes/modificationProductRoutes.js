const express = require('express');
const router = express.Router();
const modificationProductController = require('../controllers/modificationProductController');
const { upload, handleMulterError } = require('../config/multerConfig');

router.put('/modify-product', upload.single('image'), handleMulterError, modificationProductController.modifyProduct);

module.exports = router;
