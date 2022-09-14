const emoji = require("../services/recognizeServ");

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar:",
    //   anyOf(directMention(), directMessage()),
    recognize
  );
};

async function recognize({ message, client }) {
  const response = emoji.respond();

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: response,
  });
}
