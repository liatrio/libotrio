class SlackError extends Error {
  constructor(apiMethod, apiError, errorMessage, message) {
    super(message);

    this.apiMethod = apiMethod;
    this.apiError = apiError;
    this.errorMessage = errorMessage;
  }
}

class MessageCountError extends Error {
  constructor(errorMessage, message) {
    super(message);

    this.errorMessage = errorMessage;
  }
}

module.exports = {
  SlackError,
  MessageCountError,
};
