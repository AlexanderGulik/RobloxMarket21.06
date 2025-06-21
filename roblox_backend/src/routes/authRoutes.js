const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { authLimiter, trackLoginAttempts } = require('../middleware/bruteforceProtection');

router.post('/login', authLimiter, trackLoginAttempts, login);
router.post('/register', register);
router.post('/logout', logout);

module.exports = router;
