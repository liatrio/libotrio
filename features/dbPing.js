const databaseOps = require("../lib/databaseOps");
const sendMessage = require("../lib/sendMessage");

module.exports = function (app) {
  app.message("dbping", dbPing);
};

async function dbPing({ message, client }) {
  var con = databaseOps.connectToDB();
  const pings = await databaseOps.getPings(con, message.user);

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: sendMessage.reportPings(pings),
  });
}
