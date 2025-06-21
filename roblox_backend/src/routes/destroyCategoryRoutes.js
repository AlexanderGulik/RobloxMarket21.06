const express = require('express');
const router = express.Router();
const destroyCategoryController = require('../controllers/destroyCategoryController');

router.delete('/delete-category', destroyCategoryController.deleteCategory);

module.exports = router;
