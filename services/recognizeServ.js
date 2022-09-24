var i = 0;
var totalMessageCount = 0;
const maxCountLimit = 40;
const userRegex = /<@([a-zA-Z0-9]+)>/g;
const multiplierRegex = /x([0-9]+)/;

const respond = (count) => {
  i = i + count;
  return `You've gotten :cheers_to_the_beer_jar: #${i} since last restart`;
};

function ValidateMessageCount(count) {
  if (totalMessageCount + count <= maxCountLimit) {
    totalMessageCount += count;
    return totalMessageCount;
  }

  throw new MessageCountError(
    `Your \`${count}\` :beerjar: failed to be sent. Exceeds the limit of :beerjar: \`${maxCountLimit}\``
  );
}

function ReceiverIdsIn(text) {
  return (text.match(userRegex) || []).map((userMention) =>
    userMention.slice(2, -1)
  );
}

function EmojiCountIn(text) {
  const multiplier = text.match(multiplierRegex)
    ? text.match(multiplierRegex)[1]
    : 1;
  return +multiplier;
}

async function SendNotificationToGiver(client, beerJarData) {
  var giverName = await client.users.profile.get({
    user: beerJarData.giver,
  });
  var nameList = ``;

  for (let i = 0; i < beerJarData.receivers.length; i++) {
    var receiverName = await client.users.profile.get({
      user: beerJarData.receivers[i],
    });
    if (i < beerJarData.receivers.length - 1) {
      nameList = nameList + receiverName.profile.display_name + `, `;
    } else if (beerJarData.receivers.length > 1) {
      nameList += `and ` + receiverName.profile.display_name;
    } else {
      nameList += recevierName.profile.display_name;
    }
  }

  var reply = `You (${giverName.profile.display_name}) sent \`${beerJarData.count}\` :beerjar: to ${nameList}`;
  const response = await client.chat.postEphemeral({
    channel: beerJarData.channel,
    user: beerJarData.giver,
    text: reply,
  });
}

async function SendNotificationToReceivers(client, beerJarData) {
  var giverName = await client.users.profile.get({
    user: beerJarData.giver,
  });
  for (let i = 0; i < beerJarData.receivers.length; i++) {
    var receiverName = await client.users.profile.get({
      user: beerJarData.receivers[i],
    });

    var response = `You (${receiverName.profile.display_name}) been given \`${beerJarData.count}\` :beerjar: from ${giverName.profile.display_name}`;
    await client.chat.postMessage({
      channel: beerJarData.receivers[i],
      text: response,
    });
  }
}

async function GetMessageReacted(client, event) {
  const response = await client.conversations.replies({
    channel: event.item.channel,
    ts: event.item.ts,
    limit: 1,
  });
  if (response.ok) {
    return response.messages[0];
  }
}

module.exports = {
  SendNotificationToGiver,
  SendNotificationToReceivers,
  GetMessageReacted,
  respond,
  ReceiverIdsIn,
  EmojiCountIn,
  SendNotificationToGiver,
  SendNotificationToReceivers,
  ValidateMessageCount,
};
