const pool = require('../config/dbConfig');

const getOrdersByUserId = async (userId, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    let query = `
            SELECT 
                order_id,
                telegram_name,
                roblox_name,
                phone_number,
                amount,
                status,
                created_at,
                (SELECT COUNT(*) FROM Orders o2 WHERE o2.user_id = ?) AS total_count,
                items
            FROM (
                SELECT 
                    o.order_id,
                    o.telegram_name,
                    o.roblox_name,
                    o.phone_number,
                    o.amount,
                    o.status,
                    o.created_at,
                    GROUP_CONCAT(
                        JSON_OBJECT(
                            'product_id', oi.order_item_id,
                            'quantity', oi.quantity,
                            'amount', oi.amount,
                            'product_name', oi.name
                        ) 
                        ORDER BY oi.order_item_id
                    ) AS items
                FROM Orders o
                LEFT JOIN Order_Items oi ON o.order_id = oi.order_id
                WHERE o.user_id = ?
                GROUP BY o.order_id 
            ) AS subquery
            ORDER BY created_at DESC
        `;

    const params = [userId,userId];

    query += ' LIMIT ? OFFSET ?;';
    params.push(limit, offset);

    const [orders] = await pool.query(query, params);

    if (orders.length === 0) {
      return {
        orders: [],
        total: 0,
        currentPage: page,
        totalPages: 1,
        limit,
      };
    }

    const total = orders[0].total_count;
    const totalPages = Math.ceil(total / limit);

    const formattedOrders = orders.map((order) => ({
      ...order,
      items: order.items ? JSON.parse(`[${order.items}]`) : [],
      total_count: undefined,
    }));

    return {
      orders: formattedOrders,
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    throw error;
  }
};

const getIncomingOrders = async (page = 1, limit = 25) => {
  try {
    const offset = (page - 1) * limit;
    let query = `
            SELECT 
                o.order_id,
                o.telegram_name,
                o.roblox_name,
                o.phone_number,
                o.amount,
                o.status,
                o.created_at,
                o.payment_id,
                o.order_type,
                o.updated_at,
                u.username,
                u.email,
                COUNT(*) OVER() as total_count,
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'product_id', oi.order_item_id,
                        'quantity', oi.quantity,
                        'product_image', oi.image,
                        'price', oi.price,
                        'product_name', oi.name
                    )
                ) as items
            FROM Orders o
            LEFT JOIN User u ON o.user_id = u.user_id
            LEFT JOIN Order_Items oi ON o.order_id = oi.order_id
            WHERE o.order_type = 'Входящий'
        `;

    const params = [];

    query += ' GROUP BY o.order_id ORDER BY o.updated_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [orders] = await pool.query(query, params);

    if (orders.length === 0) {
      return {
        orders: [],
        total: 0,
        currentPage: page,
        totalPages: 1,
        limit,
      };
    }
    const total = orders[0].total_count;
    const totalPages = Math.ceil(total / limit);

    const formattedOrders = orders.map((order) => ({
      ...order,
      items: order.items ? JSON.parse(`[${order.items}]`) : [],
      total_count: undefined,
    }));

    return {
      orders: formattedOrders,
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    throw error;
  }
};

const getArchiveOrders = async (page = 1, limit = 25) => {
  try {
    const offset = (page - 1) * limit;
    let query = `
            SELECT 
                o.order_id,
                o.telegram_name,
                o.roblox_name,
                o.phone_number,
                o.amount,
                o.status,
                o.created_at,
                o.payment_id,
                o.order_type,
                o.updated_at,
                u.username,
                u.email,
                COUNT(*) OVER() as total_count,
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'quantity', oi.quantity,
                        'product_image', oi.image,
                        'price', oi.price,
                        'product_name', oi.name
                    )
                ) as items
            FROM Orders o
            LEFT JOIN User u ON o.user_id = u.user_id
            LEFT JOIN Order_Items oi ON o.order_id = oi.order_id
            WHERE o.order_type = 'Архивный'
        `;

    const params = [];

    query += ' GROUP BY o.order_id ORDER BY o.updated_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [orders] = await pool.query(query, params);

    if (orders.length === 0) {
      return {
        orders: [],
        total: 0,
        currentPage: page,
        totalPages: 1,
        limit,
      };
    }
    const total = orders[0].total_count;
    const totalPages = Math.ceil(total / limit);

    const formattedOrders = orders.map((order) => ({
      ...order,
      items: order.items ? JSON.parse(`[${order.items}]`) : [],
      total_count: undefined,
    }));

    return {
      orders: formattedOrders,
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  } catch (error) {
    console.error('Ошибка при получении архивныхзаказов:', error);
    throw error;
  }
};

const changeOrderTypeById = async (orderId, orderType) => {
  try {
    const [result] = await pool.query('UPDATE Orders SET order_type = ? WHERE order_id = ?', [orderType, orderId]);
    return result;
  } catch (error) {
    console.error('Ошибка при изменении типа заказа:', error);
    throw error;
  }
};

module.exports = {
  getOrdersByUserId,
  getIncomingOrders,
  getArchiveOrders,
  changeOrderTypeById,
};
