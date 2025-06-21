const Joi = require('joi');
const modificationProductModel = require('../models/modificationProductModel');
const fs = require('fs').promises;
const path = require('path');

const productSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID продукта должен быть числом',
    'any.required': 'ID продукта обязателен',
  }),
  name: Joi.string().required().messages({
    'string.base': 'Название продукта должно быть строкой',
    'any.required': 'Название продукта обязательно',
  }),
  oldCost: Joi.number().min(0).required().messages({
    'number.base': 'Старая цена должна быть числом',
    'number.min': 'Старая цена должна быть положительной',
    'any.required': 'Старая цена обязательна',
  }),
  cost: Joi.number().min(0).required().messages({
    'number.base': 'Цена должна быть числом',
    'number.min': 'Цена должна быть положительной',
    'any.required': 'Цена обязательна',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Категория должна быть строкой',
    'any.required': 'Категория обязательна',
  }),
});

exports.modifyProduct = async (req, res) => {
  const { error, value } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }

  const { id, name, oldCost, cost, category } = value;
  const image = req.file;

  try {
    const product = await modificationProductModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }

    const existingProduct = await modificationProductModel.findProductByNameInCategory(name, category, id);
    if (existingProduct) {
      return res.status(400).json({ message: 'Продукт с таким названием уже существует в данной категории' });
    }

    let imageUrl = product.image;

    if (image) {
      const oldImagePath = path.join(__dirname, '../public/images', product.image);
      try {
        await fs.access(oldImagePath);
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.error('Старое изображение не существует или не может быть удалено:', err);
      }

      imageUrl = image.filename;
    }

    const productUpdated = await modificationProductModel.updateProduct(id, {
      name,
      image: imageUrl,
      oldCost,
      cost,
      category,
    });

    res.status(200).json({
      message: 'Продукт успешно обновлен!',
      name: productUpdated.name,
      cost: productUpdated.cost,
      oldCost: productUpdated.oldCost,
      category: productUpdated.category,
      image: productUpdated.image,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
