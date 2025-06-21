const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: 'Слишком много запросов с этого IP, попробуйте позже',
});

const imageLimiter = rateLimit({
  windowMs: 1000,
  max: 40,
  message: 'Слишком много запросов с этого IP, попробуйте позже',
});

module.exports = { apiLimiter, imageLimiter };
