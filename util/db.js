const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "node_db",
});

module.exports = pool.promise();
