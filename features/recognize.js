const { ReactionMatches } = require("../middleware");
const recognize = require("../services/recognizeServ");
const errorHandler = require("../services/errorHandler");
const { SlackError, MessageCountError } = require("../services/error");

module.exports = function (app) {
  app.message(":cheers_to_the_beer_jar:", Recognize);
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function Recognize(client, message) {
  try {
    let emojiCount = recognize.EmojiCountIn(message.text);
    recognize.ValidateMessageCount(emojiCount);
    var beerJarData = {
      giver: message.user,
      receivers: recognize.ReceiverIdsIn(message.text),
      count: emojiCount,
      message: message.text,
      channel: message.channel,
      timestamp: message.ts,
    };
  } catch (error) {
    if (error instanceof SlackError) {
      return errorHandler.HandleSlackError(client, message, error);
    } else if (error instanceof MessageCountError) {
      return errorHandler.HandlesMessageCountError(client, message, error);
    } else {
      return errorHandler.HandleGenericError(client, message, error);
    }
  }
  await recognize.SendNotificationToGiver(client, beerJarData);
  await recognize.SendNotificationToReceivers(client, beerJarData);

  await client.reactions.add({
    channel: message.channel,
    name: "beerjar",
    timestamp: beerJarData.timestamp,
  });
}

async function Reaction(client, event) {
  var originalMessage = await recognize.GetMessageReacted(client, event);
  try {
    recognize.ValidateMessageCount(1);
    var beerJarData = {
      giver: event.user,
      receivers: recognize.ReceiverIdsIn(originalMessage.text),
      count: 1,
      message: originalMessage.text,
      channel: event.item.channel,
      timestamp: originalMessage.ts,
    };
  } catch (error) {
    if (error instanceof SlackError) {
      return errorHandler.HandleSlackError(client, event, error);
    } else if (error instanceof MessageCountError) {
      return errorHandler.MessageCountError(client, event, error);
    } else {
      return errorHandler.HandleGenericError(client, event, error);
    }
  }
  await recognize.SendNotificationToGiver(client, beerJarData);
  await recognize.SendNotificationToReceivers(client, beerJarData);
}

module.exports = {
  Reaction,
  Recognize,
};
