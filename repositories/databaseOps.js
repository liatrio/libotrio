var mysql = require("mysql2/promise");
const connectToDB = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
}

module.exports = { 
  connectToDB: () => { // This returns a promise so make sure to `await` it
    return mysql.createConnection({
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  },

  setupDB: async () => {
    const con = await connectToDB();
    await con.query({
      sql: "CREATE TABLE IF NOT EXISTS profiles(name varchar(20) PRIMARY KEY, pings INT)",
      timeout: 30000, // 30s
    });
  },
};
