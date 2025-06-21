const categoryModel = require('../models/categoryModel');
const redis = require('../config/redis')

exports.getCategories = async (req, res) => {
  try {
     const cachedData = await redis.get('category');
     if (cachedData) {
        
       const cach = JSON.parse(cachedData);
       return res.status(200).json(cach.categories);
     }

    const categories = await categoryModel.getCategories();

    await redis.set('category', JSON.stringify({ categories }), 'EX', 10);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении категорий.' });
  }
};
