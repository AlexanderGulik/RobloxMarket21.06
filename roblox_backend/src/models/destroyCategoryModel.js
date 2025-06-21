const db = require('../config/dbConfig');

exports.getCategoryById = async (id) => {
  const query = `
        SELECT * FROM Category WHERE category_id = ?
    `;
  const categoryId = Number(id);
  console.log('Поиск категории с ID:', categoryId);

  try {
    const [results] = await db.execute(query, [categoryId]);

    if (results.length > 0) {
      console.log('Категория найдена:', results[0]);
      return results[0];
    } else {
      console.log('Категория не найдена с ID:', categoryId);
      return null;
    }
  } catch (err) {
    console.error('Ошибка базы данных при поиске категории:', err);
    throw err;
  }
};

exports.deleteCategoryById = async (id) => {
  const checkProductsQuery = `
        SELECT COUNT(*) as productCount 
        FROM Product 
        WHERE category_id = ?
    `;

  const categoryId = Number(id);

  try {
    const [productResults] = await db.execute(checkProductsQuery, [categoryId]);
    if (productResults[0].productCount > 0) {
      throw new Error('Невозможно удалить категорию, пока с ней связаны продукты');
    }

    const deleteQuery = `
            DELETE FROM Category WHERE category_id = ?
        `;

    const [results] = await db.execute(deleteQuery, [categoryId]);

    if (results.affectedRows > 0) {
      console.log('Категория успешно удалена');
      return results;
    } else {
      console.log('Категория не найдена с ID:', categoryId);
      throw new Error('Категория не найдена');
    }
  } catch (err) {
    console.error('Ошибка базы данных при удалении категории:', err);
    throw err;
  }
};
