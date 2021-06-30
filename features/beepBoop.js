const { directMention } = require("@slack/bolt");
// const { directMessage, anyOf } = require("../middleware");

module.exports = function (app) {
    app.message(
      "beep",
    //   anyOf(directMention(), directMessage()),
      beepBoop
    );
};

async function beepBoop({ message, client }) {
    
    const response = [
        `BOOP`
      ].join("\n");
    
    await client.chat.postEphemeral({
        channel: message.channel,
        user: message.user,
        text: response,
    });
    

}