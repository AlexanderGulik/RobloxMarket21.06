const rateLimit = require('express-rate-limit');

const loginAttempts = new Map();

setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  loginAttempts.forEach((data, ip) => {
    if (data.lastAttempt < oneHourAgo) {
      loginAttempts.delete(ip);
    }
  });
}, 3600000);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: {
    error: 'Слишком много попыток входа',
    message: 'Попробуйте снова через 15 минут',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const trackLoginAttempts = (req, res, next) => {
  const ip = req.ip;
  console.log('Проверка IP:', ip);

  if (loginAttempts.has(ip)) {
    const attempts = loginAttempts.get(ip);
    const now = Date.now();

    if (attempts.blocked && now - attempts.lastAttempt < attempts.blockDuration) {
      const remainingTime = Math.ceil((attempts.blockDuration - (now - attempts.lastAttempt)) / 1000);
      return res.status(429).json({
        error: 'Доступ временно заблокирован',
        message: `Слишком много неудачных попыток. Попробуйте снова через ${remainingTime} секунд`,
        remainingTime,
      });
    }

    if (now - attempts.lastAttempt > 30 * 60 * 1000) {
      loginAttempts.delete(ip);
    }
  }

  next();
};

const recordFailedAttempt = (req) => {
  const ip = req.ip;
  const now = Date.now();

  let attempt = loginAttempts.get(ip) || {
    count: 0,
    lastAttempt: now,
    blocked: false,
    blockDuration: 0,
  };

  attempt.count += 1;
  attempt.lastAttempt = now;

  if (attempt.count >= 5) {
    attempt.blocked = true;
    const minutes = Math.min((attempt.count - 4) * 5, 30);
    attempt.blockDuration = minutes * 60 * 1000;
  }

  loginAttempts.set(ip, attempt);
  return attempt;
};

const resetLoginAttempts = (req) => {
  loginAttempts.delete(req.ip);
};

module.exports = {
  authLimiter,
  trackLoginAttempts,
  recordFailedAttempt,
  resetLoginAttempts,
};
