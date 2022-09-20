const { ReactionMatches } = require("../middleware");
const recognize = require("../services/recognizeServ");

//const beerEmojiRegex = new RegExp(":beerjar:", "g");

/*
async function userInfo(client, userId){
  const response = await client.users.info({ user: userId });
  if (response.ok) {
    return response.user;
  }
  throw new SlackError(
    "users.info",
    response.error,
    `Something went wrong while sending recognition. When retreiving user information from Slack, the API responded with the following error: ${response.message} \n Recognition has not been sent.`
  );
}
*/

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar:", //   anyOf(directMention(), directMessage()),
    Recognize
  );
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function Recognize({ message, client }) {
  //Promise.all(ReceiverIdsIn(message.text).map(async (receiver)=>userInfo(client, receiver)))
  var discontent = {
    giver: message.user,
    receivers: recognize.ReceiverIdsIn(message.text),
    count: recognize.EmojiCountIn(message.text),
    message: message.text,
    channel: message.channel,
  };

  /*
  if (receiverID.length==1){
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: response,
    });
  }else if(receiversID.length>1){
    for(let i=1;i<receiversID.length;i++){
      response+=` ${receiverID[i]}`
    }
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: response,
    });
  }
  */
  await recognize.SendNotificationToGiver(client, discontent);

  await SendNotificationToReceivers(client, discontent);

  await client.reactions.add({
    channel: discontent.channel,
    name: "beerjar",
    timestamp: message.ts,
  });
}

async function Reaction({ event, client }) {
  var originalMessage = await GetMessageReacted(client, event);
  var discontent = {
    giver: event.user,
    receivers: recognize.ReceiverIdsIn(originalMessage.text),
    count: 1,
    message: originalMessage.text,
    channel: event.item.channel,
  };

  await recognize.SendNotificationToGiver(client, discontent);

  await SendNotificationToReceivers(client, discontent);
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

async function SendNotificationToReceivers(client, discontent) {
  var giverName = await client.users.profile.get({
    user: discontent.giver,
  });
  for (let i = 0; i < discontent.receivers.length; i++) {
    var receiverName = await client.users.profile.get({
      user: discontent.receivers[i],
    });

    var response = `You (${receiverName.profile.display_name}) been given \`${discontent.count}\` :beerjar: from ${giverName.profile.display_name}`;
    await client.chat.postMessage({
      channel: discontent.receivers[i],
      text: response,
    });
  }
}


