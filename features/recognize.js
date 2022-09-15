//const emoji = require("../services/recognizeServ");
const { ReactionMatches } = require("../middleware");
const userRegex = /<@([a-zA-Z0-9]+)>/g;
const multiplierRegex = /x([0-9]+)/;
//const beerEmojiRegex = new RegExp(":beerjar:", "g");

function ReceiverIdsIn(text) {
  return (text.match(userRegex) || []).map((userMention) =>
    userMention.slice(2, -1)
  );
}

function emojiCountIn(text) {
  //const emojiCount = (text.match(beerEmojiRegex) || []).length;
  const multiplier = text.match(multiplierRegex)
    ? text.match(multiplierRegex)[1]
    : 1;
  return multiplier;
}
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
    recognize
  );
  app.event("reaction_added", ReactionMatches(":beerjar:"), Reaction);
};

async function recognize({ message, client }) {
  var giverID = message.user;
  var receiverID = ReceiverIdsIn(message.text);
  //Promise.all(ReceiverIdsIn(message.text).map(async (receiver)=>userInfo(client, receiver)))
  var amount = emojiCountIn(message.text);
  var giverName = await client.users.profile.get({
    user: giverID,
  });
  var receiverName = await client.users.profile.get({
    user: receiverID[0],
  });

  var response = `You (${giverName.profile.display_name}) sent \`${amount}\` :beerjar: to ${receiverName.profile.display_name}`; //to ${receiverName.user.profile.display_name}`
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
  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: response,
  });

  await client.chat.postEphemeral({
    channel: message.channel,
    user: receiverID[0],
    text: `You (${receiverName.profile.display_name}) been given \`${amount}\` :beerjar: from ${giverName.profile.display_name}`,
  });

  await client.reactions.add({
    channel: message.channel,
    name: "beerjar",
    timestamp: message.ts,
  });
}

async function Reaction({ event, client }) {
  var giverID = event.user;
  var originalMessage = await GetMessageReacted(client, event);
  var receiverID = ReceiverIdsIn(originalMessage.text);
  var giverName = await client.users.profile.get({
    user: giverID,
  });
  var receiverName = await client.users.profile.get({
    user: receiverID[0],
  });

  var response = `You (${giverName.profile.display_name}) sent \`1\` :beerjar: to ${receiverName.profile.display_name}`; //to ${receiverName.user.profile.display_name}`
  await client.chat.postEphemeral({
    channel: event.item.channel,
    user: event.user,
    text: response,
  });
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
