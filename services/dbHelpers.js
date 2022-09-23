
const databaseOps = require("./databaseOps");

function insert_into(query) {
    const pool = databaseOps.getPool();
    const con = await pool.getConnection();
    await con.query({
      sql: "INSERT INTO beerjars(name, jars, timestamp) VALUES(?, ?, ?)",
      timeout: 30000, // 30s
      values: [query.name,query.amount,query.timestamp],
    });

    const [rows] = await con.query({
      sql: "SELECT pings FROM profiles WHERE name = ?",
      timeout: 30000, // 30s
      values: [user],
    });

    await con.release();
}
function query_amounts(name){
    const pool = databaseOps.getPool();
    const con = await pool.getConnection();
    const count = await con.query({
        sql: "SELECT SUM(jars) FROM beerjars WHERE name = ? ",
        timeout: 30000, // 30s
        values: [name],
    });

    await con.release();
    return count;
}   
  
  module.exports = {
    insert_into, 
    query_amounts,
  };
  