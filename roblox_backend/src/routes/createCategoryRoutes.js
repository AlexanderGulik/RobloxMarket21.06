const express = require('express');
const router = express.Router();
const createCategoryController = require('../controllers/createCategoryController');
const { upload, handleMulterError } = require('../config/multerConfig');

router.post('/create-category', upload.single('image'), handleMulterError, createCategoryController.createCategory);

module.exports = router;
