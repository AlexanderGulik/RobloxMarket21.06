const addProductModel = require('../models/createProductModel');
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Название продукта должно быть строкой',
    'string.min': 'Название продукта должно содержать минимум 2 символа',
    'string.max': 'Название продукта должно содержать не более 100 символов',
    'any.required': 'Название продукта обязательно',
  }),
  oldCost: Joi.number().min(0).required().messages({
    'number.base': 'Старая цена должна быть числом',
    'number.min': 'Старая цена не может быть отрицательной',
    'any.required': 'Старая цена обязательна',
  }),
  cost: Joi.number().min(0).required().messages({
    'number.base': 'Цена должна быть числом',
    'number.min': 'Цена не может быть отрицательной',
    'any.required': 'Цена обязательна',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Категория должна быть строкой',
    'any.required': 'Категория обязательна',
  }),
});

exports.createProduct = async (req, res) => {
  const { name, oldCost, cost, category } = req.body;
  const image = req.file;

  const { error } = productSchema.validate({ name, oldCost, cost, category });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingProduct = await addProductModel.findProductByName(name, category);
    if (existingProduct) {
      return res.status(400).json({ message: 'Продукт с таким названием уже существует в данной категории' });
    }

    if (!image) {
      return res.status(400).json({ message: 'Изображение обязательно' });
    }

    const imageUrl = `${image.filename}`;

    const productData = await addProductModel.addProduct(name, imageUrl, oldCost, cost, category);

    res.status(201).json({
      message: 'Продукт успешно добавлен',
      product: {
        product_id: productData.product_id,
        name: productData.name,
        image: productData.image,
        oldCost: productData.oldCost,
        cost: productData.cost,
        category: productData.category_name,
      },
    });
  } catch (error) {
    console.error('Ошибка в контроллере создания продукта:', error);
    res.status(500).json({ message: error.message });
  }
};
