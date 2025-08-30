const mysql = require("mysql2/promise");

console.log("Connecting to the database...", process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME, process.env.DB_PORT, process.env.DB_PASSWORD);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;
