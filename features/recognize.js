const emoji = require("../services/recognizeServ");
const { ReactionMatches } = require("../middleware");

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar:",
    //   anyOf(directMention(), directMessage()),
    recognize
  );
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function recognize({ message, client }) {
  const response = emoji.respond();

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: response,
  });
  await client.reactions.add({
    channel: message.channel,
    name: "beerjar",
    timestamp: message.ts,
  });
}

async function Reaction({ event, client }) {
  await client.chat.postEphemeral({
    channel: event.item.channel,
    user: event.user,
    text: `You reacted to a message with beerjar`,
  });
}
