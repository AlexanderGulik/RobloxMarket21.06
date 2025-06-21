const Joi = require('joi');
const addCategoryModel = require('../models/createCategoryModel');

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Название категории обязательно',
    'any.required': 'Название категории обязательно',
  }),
});

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file;

  try {
    const { error } = categorySchema.validate({ name });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingCategory = await addCategoryModel.findCategoryByName(name);
    if (existingCategory) {
      return res.status(400).json({ message: 'Категория с таким названием уже существует' });
    }

    if (!image) {
      return res.status(400).json({ message: 'Изображение обязательно' });
    }

    const imageUrl = `${image.filename}`;
    const categoryData = await addCategoryModel.addCategory(name, imageUrl);

    res.status(201).json({
      message: 'Категория успешно добавлена',
      category_id: categoryData.category_id,
      name: categoryData.name,
      image: categoryData.img,
    });
  } catch (error) {
    console.error('Ошибка при добавлении категории:', error);
    res.status(500).json({ message: error.message });
  }
};
