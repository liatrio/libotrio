var i = 1;

const respond = () => {
  return `You've posted :cheers_to_the_beer_jar: #${i++} since last restart`;
};

module.exports = { respond };
