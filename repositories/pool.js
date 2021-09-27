const mysql = require("mysql2/promise");

// grab connection from the pool
// create pool at startup

module.exports = {
  setupPool: () => {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
  },

  getConnection: () => {},
};
