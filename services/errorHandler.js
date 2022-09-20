async function HandleSlackError(client, message, error) {
  return client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: error.errorMessage,
  });
}

async function HandleBeerJarError(client, message, error) {
  const errorString = error.BeerJarErrors.join(`\n`);
  const errorMessage = `Sending :cheers_to_the_beer_jar: failed with the following error(s):\n${errorString}`;
  return client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: errorMessage,
  });
}

async function HandleGenericError(client, message, error) {
  const errorMessage = `An unknown error occurred in BeerJar: ${error.message}`;
  return client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: errorMessage,
  });
}

module.exports = {
  HandleSlackError,
  HandleBeerJarError,
  HandleGenericError,
};
