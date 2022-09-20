const { SlackError } = require("./error");

async function UserInfo(client, userId) {
  const response = await client.users.info({ user: userId });
  if (response.ok) {
    return response.user.id;
  }

  throw new SlackError(
    "users.info",
    response.error,
    `Something went wrong while sending BeerJar. When retreiving user information from Slack, the API responded with the following error: ${response.message} \n BeerJar has not been sent.`
  );
}

module.exports = {
  UserInfo,
};
