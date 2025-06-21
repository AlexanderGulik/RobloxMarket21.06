const { jwtSecret } = require('../config/jwt');
const jwt = require('jsonwebtoken');

const ERROR_MESSAGES = {
  ACCESS_DENIED: 'Доступ запрещён. Требуются права администратора.',
  INVALID_TOKEN: 'Неверный или истёкший токен',
  MISSING_TOKEN: 'Токен авторизации отсутствует',
  TOKEN_EXPIRED: 'Срок действия токена истёк',
};

exports.checkAdminRole = (req, res, next) => {
  const accessToken = getTokenFromRequest(req);

  if (!accessToken) {
    return res.status(401).json({ error: ERROR_MESSAGES.MISSING_TOKEN });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecret);
    const user = decoded;

    if (user.roles === 'admin') {
      return next();
    }

    return res.status(403).json({ error: ERROR_MESSAGES.ACCESS_DENIED });
  } catch (err) {
    console.error('Ошибка при верификации токена:', err.message);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: ERROR_MESSAGES.TOKEN_EXPIRED });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
    }

    return null;
  }
};

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
}
