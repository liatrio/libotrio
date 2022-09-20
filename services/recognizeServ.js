var i = 0;
const userRegex = /<@([a-zA-Z0-9]+)>/g;
const multiplierRegex = /x([0-9]+)/;

const respond = (count) => {
  i = i + count;
  return `You've gotten :cheers_to_the_beer_jar: #${i} since last restart`;
};

function ReceiverIdsIn(text) {
  return (text.match(userRegex) || []).map((userMention) =>
    userMention.slice(2, -1)
  );
}

function EmojiCountIn(text) {
  //const emojiCount = (text.match(beerEmojiRegex) || []).length;
  const multiplier = text.match(multiplierRegex)
    ? text.match(multiplierRegex)[1]
    : 1;
  return +multiplier;
}

async function SendNotificationToGiver(client, discontent) {
  var giverName = await client.users.profile.get({
    user: discontent.giver,
  });
  var nameList = ``;
  for (let i = 0; i < discontent.receivers.length; i++) {
    var receiverName = await client.users.profile.get({
      user: discontent.receivers[i],
    });
    if (i < discontent.receivers.length - 1) {
      nameList = nameList + receiverName.profile.display_name + `, `;
    } else {
      nameList += `and ` + receiverName.profile.display_name;
    }
  }
  var reply = `You (${giverName.profile.display_name}) sent \`${discontent.count}\` :beerjar: to ${nameList}`;
  const response = await client.chat.postEphemeral({
    channel: discontent.channel,
    user: discontent.giver,
    text: reply,
  });
}

module.exports = {
  SendNotificationToGiver,
  respond,
  ReceiverIdsIn,
  EmojiCountIn,
};
