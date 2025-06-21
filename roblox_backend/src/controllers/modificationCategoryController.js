const modificationCategoryModel = require('../models/modificationCategoryModel');
const fs = require('fs').promises;
const path = require('path');
const Joi = require('joi');

const categorySchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID категории должен быть числом',
    'any.required': 'ID категории обязателен',
  }),
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Название категории должно быть строкой',
    'string.min': 'Название категории должно содержать минимум 2 символа',
    'string.max': 'Название категории должно содержать не более 100 символов',
    'any.required': 'Название категории обязательно',
  }),
});

exports.modifyCategory = async (req, res) => {
  const { id, name } = req.body;
  const image = req.file;

  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  const { error } = categorySchema.validate({ id, name });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const category = await modificationCategoryModel.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    const existingCategory = await modificationCategoryModel.findCategoryByName(name, id);
    if (existingCategory) {
      return res.status(400).json({ message: 'Категория с таким названием уже существует' });
    }

    let imageUrl = category.image;

    if (image) {
      if (category.image) {
        const oldImagePath = path.join(__dirname, '../public/images', path.basename(category.image));
        try {
          await fs.stat(oldImagePath);
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.warn('Файл не найден или не может быть удалён:', err.message);
        }
      }
      imageUrl = image.filename;
    }

    await modificationCategoryModel.updateCategory(id, { name, image: imageUrl });

    const updatedCategory = await modificationCategoryModel.getCategoryById(id);

    console.log('Updated category:', updatedCategory);

    res.status(200).json({
      message: 'Категория успешно обновлена',
      category_id: updatedCategory.category_id,
      name: updatedCategory.name,
      image: updatedCategory.image,
    });
  } catch (error) {
    console.error('Ошибка в modifyCategory:', error);
    res.status(500).json({ message: 'Ошибка сервера', details: error.message });
  }
};
