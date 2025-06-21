const db = require('../config/dbConfig');

exports.findProductByName = async (name, category) => {
  const query = `
        SELECT p.* 
        FROM Product p
        JOIN Category c ON p.category_id = c.category_id
        WHERE p.name = ? AND c.name = ?
    `;
  try {
    const [results] = await db.execute(query, [name, category]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Ошибка базы данных при проверке имени продукта в категории:', err);
    throw err;
  }
};

exports.addProduct = async (name, imageUrl, oldCost, cost, category) => {
  const insertQuery = `
        INSERT INTO Product (name, image, oldCost, cost, category_id)
        VALUES (?, ?, ?, ?, ?)
    `;
  const selectProductQuery = `
        SELECT p.*, c.name AS category_name 
        FROM Product p
        JOIN Category c ON p.category_id = c.category_id
        WHERE p.product_id = ?
    `;

  const getIdByCategory = `
        SELECT category_id FROM Category WHERE name = ?
    `;

  console.log('Добавление нового продукта с параметрами:', { name, imageUrl, oldCost, cost, category });

  try {
    const [categoryIdResult] = await db.execute(getIdByCategory, [category]);
    const categoryId = categoryIdResult[0].category_id;
    const [insertResults] = await db.execute(insertQuery, [name, imageUrl, oldCost, cost, categoryId]);

    if (insertResults.affectedRows > 0) {
      console.log('Продукт успешно добавлен с ID:', insertResults.insertId);

      const [selectResults] = await db.execute(selectProductQuery, [insertResults.insertId]);

      if (selectResults.length > 0) {
        const productData = selectResults[0];
        console.log('Полные данные продукта:', productData);
        return productData;
      } else {
        throw new Error('Не удалось получить данные добавленного продукта');
      }
    } else {
      throw new Error('Не удалось добавить продукт');
    }
  } catch (err) {
    console.error('Ошибка базы данных при добавлении продукта:', err);
    throw err;
  }
};
