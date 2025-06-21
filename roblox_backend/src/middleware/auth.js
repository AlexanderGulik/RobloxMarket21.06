const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

module.exports = (req, res, next) => {
  const accessToken = getTokenFromRequest(req);

  if (!accessToken) {
    return res.status(401).json({ message: 'Не авторизован: Токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Access Token истек:', err.message);
      return res.status(401).json({ message: 'Время доступа истекло. Авторизуйтесь снова.' });
    }

    console.error('Ошибка при верификации токена:', err.message);
    return res.status(401).json({ message: 'Не авторизован: авторизуйтесь снова' });
  }
};

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return null;
}
