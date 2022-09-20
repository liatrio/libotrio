const { ReactionMatches } = require("../middleware");
const recognize = require("../services/recognizeServ");
const { UserInfo } = require("../services/apiWrappers");
const errorHandler = require("../services/errorHandler");
const { SlackError, BeerJarError } = require("../services/error");

//const beerEmojiRegex = new RegExp(":beerjar:", "g");

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar:", //   anyOf(directMention(), directMessage()),
    Recognize
  );
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function Recognize({ message, client }) {
  //Promise.all(ReceiverIdsIn(message.text).map(async (receiver)=>userInfo(client, receiver)))
  try {
    var discontent = {
      giver: await UserInfo(client, message.user),
      receivers: recognize.ReceiverIdsIn(message.text),
      count: recognize.EmojiCountIn(message.text),
      message: message.text,
      channel: message.channel,
      timestamp: message.ts,
    };
  } catch (error) {
    if (error instanceof SlackError) {
      return errorHandler.HandleSlackError(client, message, error);
    } else if (error instanceof BeerJarError) {
      return errorHandler.HandlesBeerJarError(client, message, error);
    } else {
      return errorHandler.HandleGenericError(client, message, error);
    }
  }
  await recognize.SendNotificationToGiver(client, discontent);

  await recognize.SendNotificationToReceivers(client, discontent);

  await client.reactions.add({
    channel: discontent.channel,
    name: "beerjar",
    timestamp: discontent.timestamp,
  });
}

async function Reaction({ event, client }) {
  try {
    var originalMessage = await GetMessageReacted(client, event);

    if (!originalMessage.text.includes(":cheers_to_the_beer_jar:")) {
      return;
    }
    var discontent = {
      giver: await UserInfo(client, event.user),
      receivers: recognize.ReceiverIdsIn(originalMessage.text),
      count: 1,
      message: originalMessage.text,
      channel: event.item.channel,
      timestamp: originalMessage.ts,
    };
  } catch (error) {
    if (error instanceof SlackError) {
      return errorHandler.HandleSlackError(client, event, error);
    } else if (error instanceof BeerJarError) {
      return errorHandler.HandleBeerJarError(client, event, error);
    } else {
      return errorHandler.HandleGenericError(client, event, error);
    }
  }
  await recognize.SendNotificationToGiver(client, discontent);

  await recognize.SendNotificationToReceivers(client, discontent);
}

async function GetMessageReacted(client, message) {
  const response = await client.conversations.replies({
    channel: message.item.channel,
    ts: message.item.ts,
    limit: 1,
  });
  if (response.ok) {
    return response.messages[0];
  }
}
