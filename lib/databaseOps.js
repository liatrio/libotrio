var mysql = require("mysql2");

module.exports = {
  connectToDB: () => {
    return mysql.createConnection({
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  },

  setupDB: (con) =>
    con.promise().query({
      sql: "CREATE TABLE IF NOT EXISTS profiles(name varchar(20) PRIMARY KEY, pings INT)",
      timeout: 30000, // 30s
    }),

  getPings: async (con, user) => {
    await con.promise().query({
      sql: "INSERT INTO profiles(name, pings) VALUES(?, 1) ON DUPLICATE KEY UPDATE pings = pings + 1",
      timeout: 30000, // 30s
      values: [user],
    });

    const [rows] = await con.promise().query({
      sql: "SELECT pings FROM profiles WHERE name = ?",
      timeout: 30000, // 30s
      values: [user],
    });
    return rows[0].pings;
  },
};
