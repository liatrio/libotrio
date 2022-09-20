class SlackError extends Error {
  constructor(apiMethod, apiError, errorMessage, message) {
    super(message);

    this.apiMethod = apiMethod;
    this.apiError = apiError;
    this.errorMessage = errorMessage;
  }
}

class BeerJarError extends Error {
  constructor(BeerJarErrors, message) {
    super(message);

    this.BeerJarErrors = BeerJarErrors;
  }
}

module.exports = {
  SlackError,
  BeerJarError,
};
