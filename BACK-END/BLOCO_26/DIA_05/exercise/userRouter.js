const express = require('express');

const router = express.Router();
const {
  validateUser,
  validateEmail,
  validatePassword,
  validateLogin,
} = require('./validation');

const app = express();

app.use(validateUser, validateEmail, validatePassword);

router.post('/register', validateUser, validateEmail, validatePassword, (_req, res) => {

  return res.status(201).json({ message: 'user created' });
});

router.post('/login', validateEmail, validatePassword, validateLogin, (_req, resp) => {
  return resp.status(200).json({ 'token': '86567349784e' });
});

module.exports = router;
