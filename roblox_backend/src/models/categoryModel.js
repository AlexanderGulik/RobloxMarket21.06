const pool = require('../config/dbConfig');

exports.getCategories = async () => {
  const query = `
    SELECT 
      c.category_id, 
      c.name, 
      c.image 
    FROM Category c
  `;

  try {
    const [results] = await pool.query(query);
    return results;
  } catch (err) {
    console.error('Ошибка при получении категорий:', err);
    throw err;
  }
};
