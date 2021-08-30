var config = {};

config.mongo_url = process.env.MONGO_URL || "mongodb://mongodb:27017";

config.logLevel = process.env.LOG_LEVEL || "info";

config.recognizeEmoji = process.env.RECOGNIZE_EMOJI || ":beer_parrot:";
config.reactionEmoji = process.env.REACTION_EMOJI || ":partyparrot:";
config.maximum = 5;
config.minimumMessageLength = 20;
config.botName = process.env.BOT_NAME || "libotrio";

config.usersExemptFromMaximum = process.env.EXEMPT_USERS?.split(",") || [
  "U037FL37G",
];

module.exports = config;