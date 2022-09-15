function ReactionMatches(emoji) {
  return async ({ event, next }) => {
    if (emoji[0] == ":" && emoji[emoji.length - 1] == ":") {
      emoji = emoji.slice(1, -1);
    }
    if (event.reaction.includes(emoji)) {
      await next();
    }
  };
}

module.exports = {
  ReactionMatches,
};
