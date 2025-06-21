const Joi = require('joi');
const productModel = require('../models/allproductModel');
const redis = require('../config/redis');

const querySchema = Joi.object({
  minCost: Joi.number().min(0).optional().messages({
    'number.min': 'Минимальная цена не может быть меньше 0',
    'number.base': 'Минимальная цена должна быть числом',
  }),
  maxCost: Joi.number().min(0).optional().messages({
    'number.min': 'Максимальная цена не может быть меньше 0',
    'number.base': 'Максимальная цена должна быть числом',
  }),
  category: Joi.string().allow('').optional().messages({
    'string.base': 'Категория должна быть строкой',
  }),
  name: Joi.string().optional().messages({
    'string.base': 'Название должно быть строкой',
  }),
  sort: Joi.string().optional().messages({
    'string.base': 'Параметр сортировки должен быть строкой',
  }),
  page: Joi.number().integer().min(1).default(1).messages({
    'number.min': 'Номер страницы не может быть меньше 1',
    'number.base': 'Номер страницы должен быть числом',
    'number.integer': 'Номер страницы должен быть целым числом',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.min': 'Лимит не может быть меньше 1',
    'number.max': 'Лимит не может быть больше 100',
    'number.base': 'Лимит должен быть числом',
    'number.integer': 'Лимит должен быть целым числом',
  }),
});

exports.getProducts = async (req, res) => {
  const { error, value } = querySchema.validate(req.query);
  const queryKey = JSON.stringify(value);
  const cachedData = await redis.get(`products${queryKey}`);
  if (cachedData) {
    const cach = JSON.parse(cachedData)
    res.setHeader('X-Total-Count', cach.totalCount);
    return res.status(200).json(cach.products);
  }

  if (error) {
    return res.status(400).json({ message: 'Некорректные параметры фильтра.' });
  }

  const { minCost, maxCost, category, name, sort, page, limit } = value;

  try {
    const { products, totalCount } = await productModel.getProducts(
      minCost,
      maxCost,
      category,
      name,
      sort,
      page,
      limit
    );

    await redis.set(`products${queryKey}`, JSON.stringify({ products, totalCount }), 'EX', 10);

    res.setHeader('X-Total-Count', totalCount);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении товаров.' });
  }
};

exports.uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не был загружен' });
  }

  res.send({
    message: 'Файл загружен успешно',
    filename: req.file.filename,
    url: `/images/${req.file.filename}`,
  });
};
