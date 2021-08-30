const { directMention } = require("@slack/bolt");
const { directMessage, anyOf } = require("../middleware");

const restaurants = [
  "Aca Taco",
  "Burgers & Brews",
  "Broadway Heights"
]

module.exports = function (app) {
    app.message(
      "lunch",
      anyOf(directMention(), directMessage()),
      beepBoop
    );
};

async function beepBoop({ message, client }) {


    const response = [
      restaurants
    ].join("\n");
  
    await client.chat.postEphemeral({
        channel: message.channel,
        user: message.user,
        text: response,
    });
    
  
    
}