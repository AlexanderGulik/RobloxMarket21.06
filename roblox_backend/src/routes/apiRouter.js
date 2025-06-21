const express = require('express');
const router = express.Router();
const { checkAdminRole } = require('../middleware/checkAdminRole');
const { upload, handleMulterError } = require('../config/multerConfig');
const { jwtSecret } = require('../config/jwt');
const jwt = require('jsonwebtoken');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const createProductRoutes = require('./createProductRoutes');
const destroyProductRoutes = require('./destroyProductRoutes');
const modificationProductRoutes = require('./modificationProductRoutes');
const createCategoryRoutes = require('./createCategoryRoutes');
const destroyCategoryRoutes = require('./destroyCategoryRoutes');
const modificationCategoryRoutes = require('./modificationCategoryRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const refreshRoute = require('./refreshRoutes');
const paymentRoutes = require('./paymentRoutes');
const orderRoutes = require('./orderRoutes');

const ERROR_MESSAGES = {
  ACCESS_DENIED: 'Доступ запрещён. Требуются права администратора.',
  INVALID_TOKEN: 'Неверный или истёкший токен',
  MISSING_TOKEN: 'Токен авторизации отсутствует',
  TOKEN_EXPIRED: 'Срок действия токена истёк',
};

router.use('/', productRoutes);
router.use('/', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/auth', refreshRoute);

router.use('/payment', paymentRoutes);

router.use('/admin', checkAdminRole);

router.use('/admin', orderRoutes);
router.use('/admin', createProductRoutes);
router.use('/admin', destroyProductRoutes);
router.use('/admin', modificationProductRoutes);
router.use('/admin', createCategoryRoutes);
router.use('/admin', destroyCategoryRoutes);
router.use('/admin', modificationCategoryRoutes);

router.post('/admin/upload', upload.single('image'), handleMulterError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'Ошибка загрузки файла',
      message: 'Файл не был загружен',
    });
  }

  res.json({
    message: 'Файл загружен успешно',
    filename: req.file.filename,
    url: `/images/${req.file.filename}`,
  });
});

router.get('/admin/check', (req, res) => {
  const accessToken = getTokenFromRequest(req);

  if (!accessToken) {
    return res.status(403).json({ error: ERROR_MESSAGES.MISSING_TOKEN });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecret);
    const user = decoded;

    if (user.roles === 'admin') {
      return res.status(200).json({ message: 'Пользователь имеет права администратора' });
    } else {
      return res.status(403).json({ error: ERROR_MESSAGES.ACCESS_DENIED });
    }
  } catch (err) {
    console.error('Ошибка при верификации токена:', err.message);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: ERROR_MESSAGES.TOKEN_EXPIRED });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
    }

    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
}

module.exports = router;
