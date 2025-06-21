const destroyCategoryModel = require('../models/destroyCategoryModel');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const categorySchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID категории должен быть числом',
    'any.required': 'ID категории обязателен',
  }),
});

exports.deleteCategory = async (req, res) => {
  const { id } = req.query;

  const { error } = categorySchema.validate({ id });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const category = await destroyCategoryModel.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    if (!category.image) {
      return res.status(400).json({ error: 'Изображение категории не найдено' });
    }

    await destroyCategoryModel.deleteCategoryById(id);

    const imagePath = path.join(__dirname, '../public/images', category.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({
      message: 'Категория успешно удалена',
      category_id: category.category_id,
      name: category.name,
      image: category.image,
    });
  } catch (error) {
    console.error('Ошибка в контроллере удаления категории:', error);
    if (error.message) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({ error: error.message });
  }
};
