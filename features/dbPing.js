var mysql = require("mysql2");

module.exports = function (app) {
  app.message("pingdb", dbPing);
};

async function dbPing({ message, client }) {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  con.connect(function (err) {
    if (err) throw err;
  });

  var response = "";
  try {
    await con.ping();
    response = "Database successfully pinged!";
  } catch (err) {
    response = "DATABASE ERROR: " + err;
  }

  const returnResponse = response + "\n";

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: returnResponse,
  });
}
