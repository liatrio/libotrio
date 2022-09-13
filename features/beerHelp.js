const boopNo = require("../services/beepBoopServ");
 
module.exports = function (app) {
    app.message(
      "beerhelp",
      //   anyOf(directMention(), directMessage()),
      beepBoop
    );
  };
 
  async function beerHelp({ message, client }) {
    const response = boopNo.respond();
 
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: response,
    });
  }
