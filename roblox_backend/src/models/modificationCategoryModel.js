const db = require('../config/dbConfig');

exports.findCategoryByName = async (name, excludeId = null) => {
  let query = `SELECT category_id, name FROM Category WHERE name = ?`;
  const params = [name];

  if (excludeId) {
    query += ` AND category_id != ?`;
    params.push(excludeId);
  }

  try {
    const [results] = await db.execute(query, params);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Ошибка при проверке имени категории:', err);
    throw err;
  }
};

exports.getCategoryById = async (id) => {
  const query = `SELECT category_id, name, image FROM Category WHERE category_id = ?`;
  try {
    const [results] = await db.execute(query, [id]);

    if (results.length > 0) {
      return results[0];
    } else {
      throw new Error('Category not found');
    }
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
};

exports.updateCategory = async (id, updatedFields) => {
  const updates = [];
  const params = [];

  if (updatedFields.name !== undefined) {
    updates.push('name = ?');
    params.push(updatedFields.name);
  }

  if (updatedFields.image !== undefined) {
    updates.push('image = ?');
    params.push(updatedFields.image);
  }

  if (updates.length === 0) {
    throw new Error('Нет данных для обновления');
  }

  params.push(id);

  const updateCategoryQuery = `UPDATE Category SET ${updates.join(', ')} WHERE category_id = ?`;

  try {
    await db.execute(updateCategoryQuery, params);
    console.log('Категория успешно обновлена!');
  } catch (err) {
    console.error('Error updating category:', err);
    throw err;
  }
};
