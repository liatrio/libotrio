'use strict';
const MySql = require('mysql2');

const { resolveConfig } = require("prettier");

getDBTab = function (user) {
  return 1 // this will eventually call a db helper function
}

module.exports = function (app) {
  app.message(
    ":cheers_to_the_beer_jar: tab",
    SendTab
  );
};

async function SendTab({message, client}) {
  await client.chat.postMessage({
    channel: message.user,
    text: "\`1\`"
  });
};
