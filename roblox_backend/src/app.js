const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { MAX_FILE_SIZE } = require('./config/mimeTypes');

const apiRouter = require('./routes/apiRouter');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cookieParser());

app.use((req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.startsWith('multipart/form-data')) {
    return next();
  }
  next();
});

app.use(
  express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({ error: 'Некорректный JSON' });
        throw new Error('Некорректный JSON');
      }
    },
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '5mb',
    parameterLimit: 1000,
  })
);

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.set('x-powered-by', false);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", '*'],
        scriptSrc: ["'self'", "'unsafe-inline'", '*'],
        styleSrc: ["'self'", "'unsafe-inline'", '*'],
        imgSrc: ["'self'", 'data:', 'blob:', '*'],
        connectSrc: ["'self'", '*'],
        fontSrc: ["'self'", '*'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", '*'],
        frameSrc: ["'none'"],
        formAction: ["'self'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    xssFilter: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    noSniff: true,
    dnsPrefetchControl: { allow: false },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  })
);

app.use(xss());

app.use(compression());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: 'Слишком много запросов с этого IP, попробуйте позже',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Слишком много запросов, попробуйте позже',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
});

const imageLimiter = rateLimit({
  windowMs: 1000,
  max: 40,
  message: 'Слишком много запросов на загрузку изображений',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Превышен лимит загрузки изображений',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
});

app.use((req, res, next) => {
  if (req.url.startsWith('/api/uploads')) {
    return next();
  }

  console.log('=== Детали запроса ===');
  console.log('Origin из заголовков:', req.headers.origin);
  console.log('Метод:', req.method);
  console.log('URL:', req.url);
  console.log('Тип запроса:', req.method === 'OPTIONS' ? 'Preflight запрос' : 'Обычный запрос');
  console.log('===================');
  next();
});

app.use(
  '/api/uploads',
  (req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.removeHeader('X-DNS-Prefetch-Control');
    res.removeHeader('X-Download-Options');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('X-XSS-Protection');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('X-Permitted-Cross-Domain-Policies');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('Strict-Transport-Security');
    res.removeHeader('Origin-Agent-Cluster');
    res.removeHeader('Cross-Origin-Opener-Policy');
    res.removeHeader('Cross-Origin-Resource-Policy');

    res.header('Cache-Control', 'public, max-age=31536000, immutable');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
    res.header('Pragma', 'cache');

    next();
  },
  express.static(path.join(__dirname, 'public/images'), {
    etag: true,
    lastModified: true,
    index: false,
    dotfiles: 'deny',
    maxAge: 31536000000,
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
        res.setHeader('Vary', 'Accept-Encoding');
        res.setHeader('Pragma', 'cache');
      }
    },
  }),
  imageLimiter
);

const paymentCors = cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
});

const mainCors = cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Total-Count',
    'Content-Length',
    'Cookie',
    'Set-Cookies',
    'Cache-Contol',
  ],
  exposedHeaders: ['X-Total-Count', 'Authorization', 'Set-Cookie', 'Cookie'],
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

app.use('/api/payment', paymentCors);
app.use(
  '/api/uploads',
  cors({
    origin: '*',
    methods: ['GET'],
    credentials: false,
    exposedHeaders: ['Cache-Control', 'Content-Length', 'Expires', 'Last-Modified', 'ETag'],
    optionsSuccessStatus: 204,
  })
);
app.use('/api', mainCors);

app.use((req, res, next) => {
  if (req.headers['content-length'] > MAX_FILE_SIZE) {
    return res.status(413).json({
      error: 'Ошибка загрузки файла',
      message: `Размер файла превышает ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    });
  }
  next();
});

app.use('/api', apiRouter, limiter);

app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}/`);
});
