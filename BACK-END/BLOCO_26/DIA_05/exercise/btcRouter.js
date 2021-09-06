const express = require('express');
const { validateToken } = require('./validation');
const router = express.Router();

const app = express();

router.get('/price', validateToken, (_req, res) => {
  return res.status(200).json({ message: 'OK'});
});

module.exports = router;
