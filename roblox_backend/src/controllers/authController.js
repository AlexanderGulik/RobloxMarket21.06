const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');
const { hashPassword, comparePasswords } = require('../utils/hash');
const { jwtSecret, jwtExpiresIn } = require('../config/jwt');
const { validateUsername, validatePassword, validateEmail } = require('../utils/validation');
const { recordFailedAttempt, resetLoginAttempts } = require('../middleware/bruteforceProtection');
require('dotenv').config();
const { encrypt, decrypt } = require('../utils/encrypt');

const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Все поля обязательны',
  INVALID_USERNAME: 'Неверный формат имени пользователя',
  INVALID_EMAIL: 'Неверный формат email',
  INVALID_PASSWORD: 'Неверный формат пароля',
  PASSWORDS_DONT_MATCH: 'Пароли не совпадают',
  USERNAME_EXISTS: 'Пользователь с таким именем уже существует',
  EMAIL_EXISTS: 'Пользователь с таким email уже существует',
  USER_NOT_FOUND: 'Пользователь не найден',
  INVALID_CREDENTIALS: 'Неверный email или пароль',
  INVALID_REFRESH_TOKEN: 'Неверный Refresh Token',
  SERVER_ERROR: 'Ошибка сервера',
  LOGOUT_SUCCESS: 'Успешный выход из системы',
};

const isProduction = process.env.NODE_ENV === 'production';

function generateToken(userId, username, email, roles, secret, expiresIn) {
  return jwt.sign({ id: userId, username, email, roles }, secret, {
    expiresIn,
  });
}

function generateAccessToken(userId, username, email, roles) {
  return generateToken(userId, username, email, roles, jwtSecret, jwtExpiresIn);
}

function generateRefreshToken(userId) {
  return generateToken(
    userId,
    null,
    null,
    null,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRES_IN
  );
}

function verifyRefreshToken(refreshToken) {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error('Ошибка при верификации Refresh Token:', err);
    return null;
  }
}

async function storeRefreshToken(userId, refreshToken) {
  try {
    const encryptedToken = encrypt(refreshToken);
    await db.execute('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = ?', [
      userId,
      encryptedToken.encryptedData,
      encryptedToken.encryptedData,
    ]);
    console.log('Refresh Token сохранен в базе данных');
  } catch (error) {
    console.error('Ошибка при сохранении Refresh Token:', error);
    throw error;
  }
}

async function invalidateRefreshTokens(userId) {
  try {
    await db.execute('DELETE FROM refresh_tokens WHERE user_id = ?', [userId]);
    console.log('Все Refresh Token пользователя удалены');
  } catch (error) {
    console.error('Ошибка при удалении Refresh Token:', error);
    throw error;
  }
}

async function register(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }
  if (!validateUsername(username)) return res.status(400).json({ message: ERROR_MESSAGES.INVALID_USERNAME });
  if (!validateEmail(email)) return res.status(400).json({ message: ERROR_MESSAGES.INVALID_EMAIL });
  if (!validatePassword(password)) return res.status(400).json({ message: ERROR_MESSAGES.INVALID_PASSWORD });
  if (password !== confirmPassword) return res.status(400).json({ message: ERROR_MESSAGES.PASSWORDS_DONT_MATCH });

  try {
    const [existingUsers] = await db.execute('SELECT * FROM User WHERE username = ? OR email = ?', [username, email]);
    if (existingUsers.some((user) => user.username === username)) {
      return res.status(400).json({ message: ERROR_MESSAGES.USERNAME_EXISTS });
    }
    if (existingUsers.some((user) => user.email === email)) {
      return res.status(400).json({ message: ERROR_MESSAGES.EMAIL_EXISTS });
    }

    const hashedPassword = await hashPassword(password);
    const [result] = await db.execute('INSERT INTO User (username, email, password, roles) VALUES (?, ?, ?, ?)', [
      username,
      email,
      hashedPassword,
      'user',
    ]);

    const userId = result.insertId;
    const accessToken = generateAccessToken(userId, username, email, 'user');
    const refreshToken = generateRefreshToken(userId);
    await storeRefreshToken(userId, refreshToken);

    res.cookie('refresh_token', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
      path: '/',
    });
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      recordFailedAttempt(req);
      return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
    }

    if (!validateEmail(email)) {
      recordFailedAttempt(req);
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_EMAIL });
    }

    const [users] = await db.execute('SELECT * FROM User WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      recordFailedAttempt(req);
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      recordFailedAttempt(req);
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    resetLoginAttempts(req);

    await invalidateRefreshTokens(user.user_id);

    const accessToken = generateAccessToken(user.user_id, user.username, user.email, user.roles || []);
    const refreshToken = generateRefreshToken(user.user_id);

    await storeRefreshToken(user.user_id, refreshToken);

    res.cookie('refresh_token', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
      path: '/',
    });

    res.status(200).json({
      message: 'Успешная авторизация',
      accessToken,
      user: {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.roles,
      },
    });
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(400).json({ message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });

  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return res.status(402).json({ message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });

    const [rows] = await db.execute('SELECT token FROM refresh_tokens WHERE user_id = ?', [decoded.id]);
    const storedEncryptedToken = rows[0]?.token;
    if (!storedEncryptedToken) return res.status(402).json({ message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });

    const storedRefreshToken = decrypt({
      iv: process.env.ENCRYPTION_IV,
      encryptedData: storedEncryptedToken,
    });
    if (storedRefreshToken !== refreshToken)
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });

    const [userRows] = await db.execute('SELECT user_id, username, email, roles FROM User WHERE user_id = ?', [
      decoded.id,
    ]);
    const user = userRows[0];
    if (!user) return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });

    const accessToken = generateAccessToken(user.user_id, user.username, user.email, user.roles || []);

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
}

async function logout(req, res) {
  const refreshToken = req.cookies.refresh_token;
  console.log(refreshToken);
  if (!refreshToken) return res.status(400).json({ message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });

  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return res.status(401).json({ message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });

    await invalidateRefreshTokens(decoded.id);
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
      path: '/',
    });
    res.status(200).json({ message: ERROR_MESSAGES.LOGOUT_SUCCESS });
  } catch (err) {
    console.error('Ошибка при выходе из системы:', err);
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
}

module.exports = { register, login, logout, refreshToken };
