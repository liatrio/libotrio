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

async function Recognize(client, message) {
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


