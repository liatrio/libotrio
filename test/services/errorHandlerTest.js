const sinon = require("sinon");
const expect = require("chai").expect;
const errorHandler = require("../../services/errorHandler");

describe("services/errorHandler", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("HandleSlackError", async () => {
    it("should return proper error message", async () => {
      const testClient = {
        chat: {
          postEphemeral: sinon.stub(),
        },
      };
      const testMessage = {
        channel: `testChannel`,
        user: `testUser`,
      };
      const testError = {
        errorMessage: `test error`,
        BeerJarErrors: [`error1`, `error2`],
      };
      await errorHandler.HandleSlackError(testClient, testMessage, testError);
      sinon.assert.calledWith(testClient.chat.postEphemeral, {
        channel: testMessage.channel,
        user: testMessage.user,
        text: testError.errorMessage,
      });
    });
  });

  describe("HandleBeerJarError", async () => {
    it("should return proper error message", async () => {
      const testClient = {
        chat: {
          postEphemeral: sinon.stub(),
        },
      };
      const testMessage = {
        channel: `testChannel`,
        user: `testUser`,
      };
      const testError = {
        userMessage: `test error`,
        BeerJarErrors: [`error1`, `error2`],
      };
      const errorMessage = `Sending :cheers_to_the_beer_jar: failed with the following error(s):\nerror1\nerror2`;
      await errorHandler.HandleBeerJarError(testClient, testMessage, testError);
      sinon.assert.calledWith(testClient.chat.postEphemeral, {
        channel: testMessage.channel,
        user: testMessage.user,
        text: errorMessage,
      });
    });
  });

  describe("HandleGenericError", async () => {
    it("should return proper error message", async () => {
      const testClient = {
        chat: {
          postEphemeral: sinon.stub(),
        },
      };
      const testMessage = {
        channel: `testChannel`,
        user: `testUser`,
      };
      const testError = {
        message: `test error`,
      };
      const errorMessage = `An unknown error occurred in BeerJar: ${testError.message}`;
      await errorHandler.HandleGenericError(testClient, testMessage, testError);
      sinon.assert.calledWith(testClient.chat.postEphemeral, {
        channel: testMessage.channel,
        user: testMessage.user,
        text: errorMessage,
      });
    });
  });
});
