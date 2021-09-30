const databaseOps = require("./databaseOps");

module.exports = {
  getPings: async (user) => {
    const pool = databaseOps.getPool();
    const con = await pool.getConnection();
    await con.query({
      sql: "INSERT INTO profiles(name, pings) VALUES(?, 1) ON DUPLICATE KEY UPDATE pings = pings + 1",
      timeout: 30000, // 30s
      values: [user],
    });

    const [rows] = await con.query({
      sql: "SELECT pings FROM profiles WHERE name = ?",
      timeout: 30000, // 30s
      values: [user],
    });

    await con.release();
    return rows[0].pings;
  },
};
