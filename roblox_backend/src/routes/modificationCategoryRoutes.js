const express = require('express');
const router = express.Router();
const modificationCategoryController = require('../controllers/modificationCategoryController');
const { upload, handleMulterError } = require('../config/multerConfig');

router.put(
  '/modify-category',
  upload.single('image'),
  handleMulterError,
  modificationCategoryController.modifyCategory
);

module.exports = router;
