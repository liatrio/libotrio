const emoji = require("../services/recognizeServ");

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar:",
    //   anyOf(directMention(), directMessage()),
    recognize
  );
  app.event("reaction_added", reactionMatches(":beerjar:"), reaction);
};

async function recognize({ message, client }) {
  const response = emoji.respond();

  return Promise.all([
    client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: response,
    }),
    client.reactions.add({
      channel: message.channel,
      name: "beerjar",
      timestamp: message.ts,
    }),
  ]);
}

async function reaction({ event, client }) {
  await client.chat.postEphemeral({
    channel: event.item.channel,
    user: event.user,
    text: `You reacted to a message with beerjar`,
  });
}

function reactionMatches(emoji) {
  return async ({ event, next }) => {
    if (emoji[0] == ":" && emoji[emoji.length - 1] == ":") {
      emoji = emoji.slice(1, -1);
    }
    if (event.reaction.includes(emoji)) {
      await next();
    }
  };
}
