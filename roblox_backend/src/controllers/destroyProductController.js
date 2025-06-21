const destroyProductModel = require('../models/destroyProductModel');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const productSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID продукта должен быть числом',
    'any.required': 'ID продукта обязателен',
  }),
});

exports.deleteProduct = async (req, res) => {
  const { id } = req.query;

  const { error } = productSchema.validate({ id });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await destroyProductModel.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Продукт не найден' });
    }

    if (!product.image) {
      return res.status(400).json({ error: 'Изображение продукта не найдено' });
    }

    await destroyProductModel.deleteProductById(id);

    res.status(200).json({
      message: 'Продукт успешно удален',
    });
  } catch (error) {
    console.error('Ошибка в контроллере удаления продукта:', error);
    res.status(500).json({ error: error.message });
  }
};
