const { ReactionMatches } = require("../middleware");
const recognize = require("../services/recognizeServ");


module.exports = function (app) {
  app.message(":cheers_to_the_beer_jar:", Recognize);
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function Recognize(client, message) {
  var discontent = {
    giver: message.user,
    receivers: recognize.ReceiverIdsIn(message.text),
    count: recognize.EmojiCountIn(message.text),
    message: message.text,
    channel: message.channel,
  };

  
  await recognize.SendNotificationToGiver(client, discontent);
  await recognize.SendNotificationToReceivers(client, discontent);

  await client.reactions.add({
    channel: message.channel,
    name: "beerjar",
    timestamp: message.ts,
  });
}

async function Reaction( client, event ) {
  var originalMessage = await recognize.GetMessageReacted(client, event);
  var discontent = {
    giver: event.user,
    receivers: recognize.ReceiverIdsIn(originalMessage.text),
    count: 1,
    message: originalMessage.text,
    channel: event.item.channel,
  };

  await recognize.SendNotificationToGiver(client, discontent);
  await recognize.SendNotificationToReceivers(client, discontent);
}


module.exports = {
  Reaction,
  Recognize,
};


