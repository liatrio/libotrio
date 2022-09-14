module.exports = function (app) {
  app.message("help", helpMe);
};

async function helpMe({ message, say }) {
   console.log("is this working?");
   await say("N0 h31p 4 U!");
}
