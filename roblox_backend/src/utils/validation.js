const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}-]{6,35}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,35}$/;

function validateUsername(username) {
  return usernameRegex.test(username);
}

function validatePassword(password) {
  return passwordRegex.test(password);
}

function validateEmail(email) {
  return emailRegex.test(email);
}

module.exports = { validateUsername, validatePassword, validateEmail };
