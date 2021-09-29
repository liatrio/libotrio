const mysql = require("mysql2");

let pool;

module.exports = {
  setupPool: () => {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
    console.log("Pool created!");
  },

  grabConnection: () => {
    if (pool) return pool.promise();
    else throw "POOL UNDEFINED";
  },
};