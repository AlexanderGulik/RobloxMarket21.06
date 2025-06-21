const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

/**
 * Шифрует текст с использованием AES-256-CBC.
 * @param {string} text - Текст для шифрования.
 * @returns {Object} - Объект с iv и зашифрованными данными.
 * @throws {Error} - Если текст не передан.
 */
function encrypt(text) {
  if (!text) {
    throw new Error('Текст для шифрования не передан');
  }

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

/**
 * Дешифрует текст с использованием AES-256-CBC.
 * @param {Object} text - Объект с iv и зашифрованными данными.
 * @returns {string} - Расшифрованный текст.
 * @throws {Error} - Если данные для дешифрования не переданы или некорректны.
 */
function decrypt(text) {
  if (!text || !text.iv || !text.encryptedData) {
    throw new Error('Некорректные данные для дешифрования');
  }

  try {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(text.iv, 'hex'));
    let decrypted = decipher.update(text.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new Error('Ошибка при дешифровании: ' + error.message);
  }
}

module.exports = { encrypt, decrypt };
