var mysql = require("mysql2");

module.exports = function (app) {
  app.message("dbping", dbPing);
};

async function dbPing({ message, client }) {
  // Connect to the database
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  con.connect(function (err) {
    if (err) throw err;
  });

  // First we will make the table if there isn't one
  var response = "";
  con.query(
    {
      sql: "CREATE TABLE IF NOT EXISTS profiles(name varchar(20) PRIMARY KEY, pings INT)",
      timeout: 30000, // 30s
    },
    function (err) {
      if (err) throw err;
    }
  );

  // Then we will INSERT/UPDATE the current ping value
  con.query(
    {
      sql: "INSERT INTO profiles(name, pings) VALUES(?, 1) ON DUPLICATE KEY UPDATE pings = pings + 1",
      timeout: 30000, // 30s
      values: [message.user],
    },
    function (err) {
      if (err) throw err;
    }
  );

  // Finally we will grab the ping value
  con.query(
    {
      sql: "SELECT pings FROM profiles WHERE name = ?",
      timeout: 30000, // 30s
      values: [message.user],
    },
    function (err, results) {
      if (err) throw err; // if there's an error then throw
      // otherwise, do this...
      console.log(results[0].pings);
      response = "total pings from you: " + results[0].pings;
    }
  );

  const returnResponse = response + "\n";

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: returnResponse,
  });
}
