const pool = require("./pool");

module.exports = {
  setupDB: async () => {
    const promisePool = pool.grabConnection();
    await promisePool.query({
      sql: "CREATE TABLE IF NOT EXISTS profiles(name varchar(20) PRIMARY KEY, pings INT)",
      timeout: 30000, // 30s
    });
  },
};
