const mysql = require("mysql2/promise");

let pool;

const getPool = () => {
  if (pool) return pool;
  else throw "POOL UNDEFINED";
};

module.exports = {
  setupDB: async () => {
    const pool = getPool();
    await pool.query({
      sql: "CREATE TABLE IF NOT EXISTS profiles(name varchar(20) PRIMARY KEY, pings INT)",
      timeout: 30000, // 30s
    });
    await pool.query({
      sql: "CREATE TABLE IF NOT EXISTS beerjars(name varchar(20) PRIMARY KEY, beerjar INT, timestamp FLOAT)",
      timeout: 30000, // 30s
    });

  },

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

  getPool,
};
