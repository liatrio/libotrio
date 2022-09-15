// This file defines a help messege that
// will make the functionality of beerjar
// obvious to users

module.exports = function (app) {
  app.message("help", helpMe);
};

const helpMD = `

:Beer: Hey you've made is to the Beerjar help center 

### How to use
> :cheers_to_the_beer_jar: For missing this mornings stand up. 
 Note: people can get stacked for beers by adding the beer emoji

After a certain threshhold of 25 beerjars you will have to buy a beer for the person who beer jared you 


### viewing your balance
> @beerjar check balance

### Viewing the scoreboard
> @beerjar view scores


Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ornare suspendisse sed nisi lacus sed viverra tellus in hac.Ante metus dictum at tempor.
  At varius vel pharetra vel turpis nunc eget lorem.
  Non odio euismod lacinia at quis risus sed.Volutpat commodo sed egestas egestas fringilla phasellus.
  Praesent elementum facilisis leo vel fringilla est ullamcorper eget.
  Amet mattis vulputate enim nulla aliquet porttitor lacus luctus.Libero volutpat sed cras ornare arcu.Aliquet porttitor lacus luctus accumsan tortor posuere ac ut.
  Scelerisque felis imperdiet proin fermentum leo vel orci.Sagittis orci a scelerisque purus semper eget duis.
  Magna sit amet purus gravida quis blandit turpis cursus in .Massa sapien faucibus et molestie ac feugiat sed lectus.
  Facilisi morbi tempus iaculis urna id volutpat.Vulputate odio ut enim blandit volutpat maecenas.`;

async function helpMe({ say }) {
  console.log("help messege invoked");
  await say(helpMD);
}
