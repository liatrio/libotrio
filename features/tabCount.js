"use strict";
/*
 * This file adds functionality for users to query their respective
 * 'tabs' or the amount of beer jars they currently possess at the
 * time. it does this by querying a db and returning all unresolved
 * beer jars connected to the user.
 *
 * in its current form:
 * TODO
 * - not tested
 *   no db connection
 */

module.exports = function (app) {
  app.message(":cheers_to_the_beer_jar: tab", SendTab);
};

async function SendTab({ message, client }) {
  await client.chat.postMessage({
    channel: message.user,
    text: "`" + "1" + "`",
  });
}
