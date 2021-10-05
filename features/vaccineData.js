const vaccine = require("../repositories/vaccineOps.js");
const vaccineSearch =
  /vaccine (AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|D|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)/;

//Should Take in vaccine keyword and two letter state
module.exports = function (app) {
  //Regular Expression search (vaccine + State Abbreviation)
  app.message(vaccineSearch, vaccineData);
};

async function vaccineData({ message, client }) {
  //Place state abbriviation into own variable
  const [, stateAbv] = message.text.split(" ");

  //Use input state to retrieve data
  const stateVaccineData = await vaccine.getUsDataByState(stateAbv);

  await client.chat.postEphemeral({
    channel: message.channel,
    user: message.user,
    text: `Percentage Vaccinated in ${stateAbv}: ${stateVaccineData[0].series_complete_pop_pct}%`,
  });
}
