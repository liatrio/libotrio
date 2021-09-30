const pool = require("./pool");

module.exports = {
  getPings: async (user) => {
    const promisePool = pool.getPool();
    await promisePool.query({
      sql: "INSERT INTO profiles(name, pings) VALUES(?, 1) ON DUPLICATE KEY UPDATE pings = pings + 1",
      timeout: 30000, // 30s
      values: [user],
    });

    const [rows] = await promisePool.query({
      sql: "SELECT pings FROM profiles WHERE name = ?",
      timeout: 30000, // 30s
      values: [user],
    });
    return rows[0].pings;
  },
};
