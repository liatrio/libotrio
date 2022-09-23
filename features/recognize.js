const { ReactionMatches } = require("../middleware");
const recognize = require("../services/recognizeServ");

module.exports = function (app) {
  app.message(":cheers_to_the_beer_jar:", Recognize);
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function Recognize(client, message) {
  var beerJarData = {
    giver: message.user,
    receivers: recognize.ReceiverIdsIn(message.text),
    count: recognize.EmojiCountIn(message.text),
    message: message.text,
    channel: message.channel,
  };

  await recognize.SendNotificationToGiver(client, beerJarData);
  await recognize.SendNotificationToReceivers(client, beerJarData);

  await client.reactions.add({
    channel: message.channel,
    name: "beerjar",
    timestamp: message.ts,
  });
}

async function Reaction(client, event) {
  var originalMessage = await recognize.GetMessageReacted(client, event);
  var beerJarData = {
    giver: event.user,
    receivers: recognize.ReceiverIdsIn(originalMessage.text),
    count: 1,
    message: originalMessage.text,
    channel: event.item.channel,
  };

  await recognize.SendNotificationToGiver(client, beerJarData);
  await recognize.SendNotificationToReceivers(client, beerJarData);
}

module.exports = {
  Reaction,
  Recognize,
};
