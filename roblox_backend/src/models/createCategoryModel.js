const db = require('../config/dbConfig');

exports.findCategoryByName = async (name) => {
  const query = `SELECT * FROM Category WHERE name = ?`;
  try {
    const [results] = await db.execute(query, [name]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Ошибка базы данных при проверке имени категории:', err);
    throw err;
  }
};

exports.findProductByName = async (name) => {
  const query = `SELECT * FROM Product WHERE name = ?`;
  try {
    const [results] = await db.execute(query, [name]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Ошибка базы данных при проверке имени продукта:', err);
    throw err;
  }
};

exports.addCategory = async (name, imageUrl) => {
  const insertQuery = `
        INSERT INTO Category (name, image)
        VALUES (?, ?)
    `;
  const selectQuery = `
        SELECT * FROM Category WHERE category_id = ?
    `;

  console.log('Добавление новой категории с параметрами:', { name, imageUrl });

  try {
    const [insertResults] = await db.execute(insertQuery, [name, imageUrl]);

    if (insertResults.affectedRows > 0) {
      console.log('Категория успешно добавлена с ID:', insertResults.insertId);

      const [selectResults] = await db.execute(selectQuery, [insertResults.insertId]);

      if (selectResults.length > 0) {
        console.log('Полные данные категории:', selectResults[0]);
        return selectResults[0];
      } else {
        throw new Error('Не удалось получить данные добавленной категории');
      }
    } else {
      throw new Error('Не удалось добавить категорию');
    }
  } catch (err) {
    console.error('Ошибка базы данных при добавлении категории:', err);
    throw err;
  }
};
