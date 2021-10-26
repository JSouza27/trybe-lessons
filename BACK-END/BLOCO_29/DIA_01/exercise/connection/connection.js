const mysql = require('mysql2/promise');

const DATABASE = 'plants';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'trybe',
  password: '123456',
  database:DATABASE,
});

module.exports = { connection };
