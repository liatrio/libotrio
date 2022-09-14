const emoji = require("../services/recognizeServ");
const userRegex = /<@([a-zA-Z0-9]+)>/g;
const multiplierRegex = /x([0-9]+)/;
const beerEmojiRegex = new RegExp(":beerjar:", "g");

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

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar:",
    //   anyOf(directMention(), directMessage()),
    recognize
  );
};

async function recognize({ message, client }) {
  giverID=message.user
  receiverID = Promise.all(ReceiverIdsIn(message.text).map(async (receiver)=>userInfo(client, receiver)))
  amount = emojiCountIn(message.text)
  response = `You (${giverID}) sent ${amount} :beerjar: to ${receiverID[0]}`

  /*const giverName = await client.users.profile.get({
    user: giverID,
  });
  const receiverName = await client.users.profile.get({
    user: receiverID,
  });
  */
  
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
}
