// This file defines a help messege that
// will make the functionality of beerjar
// obvious to users

module.exports = function (app) {
  app.message("beerJar help", helpMe);
};

const helpMD = `

:Beer: Hey you've made is to the Beerjar help center 

How to use
> :cheers_to_the_beer_jar: For missing this mornings stand up. 
 Note: people can get stacked for beers by adding the beer emoji

After a certain threshhold of 25 beerjars you will have to buy a beer for the person who beer jared you 


viewing your balance
> @beerjar check balance

Viewing the scoreboard
> @beerjar view scores

`;

async function helpMe({ message, client }) {
  console.log("help messege invoked");
  message.user,
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: helpMD,
    });
}
