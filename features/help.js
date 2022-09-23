// This file defines a help messege that
// will make the functionality of beerjar
// obvious to users

module.exports = function (app) {
  app.message("help", helpMe);
};

async function helpMe({ say }) {
  console.log("help messege invoked");
  await say("N0 h31p 4 U!");
}
