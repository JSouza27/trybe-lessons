require('dotenv/config');
const mysql = require('mysql2/promise');

const connections = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: 'mvc_example',
});

module.exports = connections;
