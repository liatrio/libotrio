const boopNo = require("../services/beepBoopServ");
 
module.exports = function (app) {
	app.message(':wave:', async ({ message, say }) => {
  await say(`Hello world`);
})
  };
 
  async function beerHelp({ message, client }) {
    const response = boopNo.respond();
 
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: response,
    });
  }
