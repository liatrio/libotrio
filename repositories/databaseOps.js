const mysql = require("mysql2/promise");
const pool  = require("./pool");

// const connectToDB = () => {
//   return mysql.createConnection({
//     host: process.env.MYSQL_HOSTNAME,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   });
// };

module.exports = {
  // connectToDB,

  setupDB: async () => {
    const promisePool = pool.grabConnection();
    await promisePool.query({
      sql: "CREATE TABLE IF NOT EXISTS profiles(name varchar(20) PRIMARY KEY, pings INT)",
      timeout: 30000, // 30s
    });
  },
};
