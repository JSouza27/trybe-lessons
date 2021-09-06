const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const rePassword = /^[0-9]$/;
const reToken = /([0-9]+)([0-9]+)/gi


const validateUser = (req, res, next) => {
  const { username } = req.body;

  if (username.length < 3)
    return res.status(400).json({ menssage: 'Invalid username' });

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email.match(re))
    return res.status(400).json({ message: 'Invalid email' });

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if(
    password.toString().length < 4 ||
    password.toString().length > 8 ||
    !password.match(rePassword)
  )
    return res.status(400).json({ message: 'Ivalid password'});

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 'message': 'email or password is incorrect' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (authorization.length !== 12 || !authorization.match(reToken)) {
    return res.status(401).json({ 'message': 'invalid token' });
  }
  next();
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
  validateLogin,
  validateToken,
};
