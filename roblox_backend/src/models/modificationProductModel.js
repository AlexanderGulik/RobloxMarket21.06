const db = require('../config/dbConfig');

exports.findProductByNameInCategory = async (name, category, excludeId = null) => {
  let query = `
        SELECT p.* 
        FROM Product p
        JOIN Category c ON p.category_id = c.category_id
        WHERE p.name = ? AND c.name = ?
    `;
  const params = [name, category];

  if (excludeId) {
    query += ` AND p.product_id != ?`;
    params.push(excludeId);
  }

  try {
    const [results] = await db.execute(query, params);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Ошибка при проверке имени продукта в категории:', err);
    throw err;
  }
};

exports.getProductById = async (id) => {
  const query = `
        SELECT * FROM Product WHERE product_id = ?
    `;
  const productId = Number(id);
  console.log(productId);
  try {
    const [results] = await db.execute(query, [productId]);

    if (results.length > 0) {
      return results[0];
    } else {
      throw new Error('Продукт не найден');
    }
  } catch (err) {
    console.error('Ошибка сервера:', err);
    throw err;
  }
};

exports.updateProduct = async (id, updatedFields) => {
  const getProductQuery = `
        SELECT * FROM Product WHERE product_id = ?
    `;

  const getCategoryIdQuery = `
        SELECT category_id FROM Category WHERE name = ?
    `;

  try {
    const [productResults] = await db.execute(getProductQuery, [id]);
    const existingProduct = productResults[0];

    if (!existingProduct) {
      throw new Error('Продукт не найден.');
    }

    const [categoryResults] = await db.execute(getCategoryIdQuery, [updatedFields.category]);

    if (categoryResults.length === 0) {
      throw new Error('Категория не найдена.');
    }

    const categoryId = categoryResults[0].category_id;

    const updatedProduct = {
      ...existingProduct,
      ...updatedFields,
      category_id: categoryId,
    };

    const updateProductQuery = `
            UPDATE Product 
            SET name = ?, image = ?, oldCost = ?, cost = ?, category_id = ?
            WHERE product_id = ?
        `;
    console.log(updatedProduct);
    const [updateResults] = await db.execute(updateProductQuery, [
      updatedProduct.name,
      updatedProduct.image,
      updatedProduct.oldCost,
      updatedProduct.cost,
      updatedProduct.category_id,
      id,
    ]);

    return updatedProduct;
  } catch (err) {
    console.error('Ошибка обновления продукта:', err);
    throw err;
  }
};
