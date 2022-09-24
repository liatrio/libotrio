async function HandleSlackError(client, message, error) {
  return client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: error.errorMessage,
  });
}

async function HandleMessageCountError(client, message, error) {
  return client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: error.errorMessage,
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
  HandleMessageCountError,
  HandleGenericError,
};
