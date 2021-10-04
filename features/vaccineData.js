const vaccine = require("../repositories/vaccineOps.js");

//Should Take in vaccine keyword and two letter state
module.exports = function (app) {
  //Regular Expression search (vaccine + State Abbreviation)
  let vaccineSearch =
    /vaccine (AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|D|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)/;
  app.message(vaccineSearch, vaccineData);
};

async function vaccineData({ message, client }) {
  //Cut out State Abbriviation into array
  stateAbbriv = message.text;
  const stateAbv = message.text.split(" ", 2);

  //Use input state to retrieve data
  const vaccinedata = await vaccine.getUsData(stateAbv[1]);

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text:
      "Percentage Vaccinated in " +
      stateAbv[1] +
      ": " +
      vaccinedata[0].series_complete_pop_pct +
      "%",
  });
}
