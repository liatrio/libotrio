var i = 0;
const userRegex = /<@([a-zA-Z0-9]+)>/g;

const respond = (count) => {
  i = i + count;
  return `You've gotten :cheers_to_the_beer_jar: #${i} since last restart`;
};

function ReceiverIdsIn(text) {
  return (text.match(userRegex) || []).map((userMention) =>
    userMention.slice(2, -1)
  );
}

module.exports = {
  respond,
  ReceiverIdsIn,
};
