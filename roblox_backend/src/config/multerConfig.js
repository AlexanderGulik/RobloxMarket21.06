const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { MIME_TYPES, ALLOWED_MIME_TYPES, MAX_FILE_SIZE } = require('./mimeTypes');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../public/images');
    try {
      await fs.access(uploadDir);
    } catch (err) {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extension = MIME_TYPES[file.mimetype];
    const uniqueName = `${uuidv4()}.${extension}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла. Разрешены только: ' + ALLOWED_MIME_TYPES.join(', ')), false);
  }
};

const uploadConfig = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      new Error('Слишком большой размер. Максимальный размер файла: ' + MAX_FILE_SIZE / (1024 * 1024) + 'MB');
    }
    return res.status(400).json({
      error: 'Ошибка загрузки файла',
      message: err.message,
    });
  }

  if (err && err.message && err.message.includes('Неподдерживаемый тип файла')) {
    return res.status(415).json({
      error: 'Ошибка загрузки файла',
      message: `Неподдерживаемый тип файла. Разрешены только: ${ALLOWED_MIME_TYPES.join(', ')}`,
    });
  }

  if (err) {
    return res.status(400).json({
      error: 'Ошибка загрузки файла',
      message: err.message,
    });
  }

  next();
};

module.exports = {
  upload: uploadConfig,
  handleMulterError,
};
