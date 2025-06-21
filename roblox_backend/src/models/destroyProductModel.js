const db = require('../config/dbConfig');

exports.getProductById = async (id) => {
  const query = `
        SELECT * FROM Product WHERE product_id = ?
    `;
  const productId = Number(id);
  console.log('Поиск продукта с ID:', productId);

  try {
    const [results] = await db.execute(query, [productId]);

    if (results.length > 0) {
      console.log('Продукт найден:', results[0]);
      return results[0];
    } else {
      console.log('Продукт не найден с ID:', productId);
      return null;
    }
  } catch (err) {
    console.error('Ошибка базы данных при поиске продукта:', err);
    throw err;
  }
};

exports.deleteProductById = async (id) => {
  const query = `
        DELETE FROM Product WHERE product_id = ?
    `;
  const productId = Number(id);
  console.log('Удаление продукта с ID:', productId);

  try {
    const [results] = await db.execute(query, [productId]);

    if (results.affectedRows > 0) {
      console.log('Продукт успешно удален');
      return results;
    } else {
      console.log('Продукт не найден с ID:', productId);
      throw new Error('Продукт не найден');
    }
  } catch (err) {
    console.error('Ошибка базы данных при удалении продукта:', err);
    throw err;
  }
};
