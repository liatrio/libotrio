const pings = require("../repositories/pings");
const sendMessage = require("../services/sendMessage");

module.exports = function (app) {
  app.message("dbping", dbPing);
};

async function dbPing({ message, client }) {
  const ping = await pings.getPings(message.user);

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: sendMessage.reportPings(ping),
  });
}
