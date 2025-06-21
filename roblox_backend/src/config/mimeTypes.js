const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
};

const ALLOWED_MIME_TYPES = Object.keys(MIME_TYPES);

const MAX_FILE_SIZE = 8 * 1024 * 1024;

module.exports = {
  MIME_TYPES,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
};
