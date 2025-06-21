const pool = require('../config/dbConfig');

exports.getProducts = async (minCost, maxCost, categoryName, productName, sort, page, limit) => {
  let offset;
  if (page && limit) {
    offset = (page - 1) * limit;
  }

  const queryParams = [];
  let countQuery = `
    SELECT COUNT(*) AS total_count
    FROM Product p
    JOIN Category c ON p.category_id = c.category_id
    WHERE 1=1
  `;

  let dataQuery = `
    SELECT 
      p.product_id, 
      p.name, 
      p.image,
      p.cost, 
      p.oldCost,
      c.name AS category
    FROM Product p
    JOIN Category c ON p.category_id = c.category_id
    WHERE 1=1
  `;

  if (categoryName) {
    countQuery += ` AND c.name = ?`;
    dataQuery += ` AND c.name = ?`;
    queryParams.push(categoryName);
  }
  if (minCost) {
    countQuery += ` AND p.cost >= ?`;
    dataQuery += ` AND p.cost >= ?`;
    queryParams.push(minCost);
  }
  if (maxCost) {
    countQuery += ` AND p.cost <= ?`;
    dataQuery += ` AND p.cost <= ?`;
    queryParams.push(maxCost);
  }
  if (productName) {
    countQuery += ` AND p.name LIKE ?`;
    dataQuery += ` AND p.name LIKE ?`;
    queryParams.push(`%${productName}%`);
  }

  if (sort) {
    const sortOptions = {
      title_asc: 'p.name ASC',
      title_desc: 'p.name DESC',
      cost_asc: 'p.cost ASC',
      cost_desc: 'p.cost DESC',
    };
    dataQuery += ` ORDER BY ${sortOptions[sort] || 'p.product_id'}`;
  } else {
    dataQuery += ` ORDER BY p.product_id`;
  }

  if (limit) {
    dataQuery += ` LIMIT ?`;
    queryParams.push(limit);
  }
  if (page) {
    dataQuery += ` OFFSET ?`;
    queryParams.push(offset);
  }

  try {
    const [countResults] = await pool.query(countQuery, queryParams);
    const totalCount = countResults[0].total_count;

    const [dataResults] = await pool.query(dataQuery, queryParams);

    return { products: dataResults, totalCount };
  } catch (err) {
    console.error('Ошибка при получении продуктов:', err);
    throw err;
  }
};
