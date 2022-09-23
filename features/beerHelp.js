// This file defines a help messege that
// will make the functionality of beerjar
// obvious to users

module.exports = function (app) {
  app.message("beerjar help", helpMe);
};

const helpMD = `

:Beer: Hey you've made is to the Beerjar help center 

How to use
> @benny For missing this mornings standup :cheers_to_the_beer_jar: 
 Note: people can get stacked for beers by adding the beer emoji as a reaction.

You can also tag multiple people.
> @benny @ryan @evan @zack @steven for forgetting to lock up the office :cheers_to_beer_jar:

*Not implemented yet*
After a certain threshold of 25 beerjars you will have to buy a beer for the person who beer jared you 

A multiplier can be added to give your daily beerjars away.
>@benny for missing standup :cheers_to_the_beer_jar:x5 

*Not implementedyet*
Viewing your balance
> beerjar check balance

*Not implemented yet*
Viewing the scoreboard
> beerjar show score

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
