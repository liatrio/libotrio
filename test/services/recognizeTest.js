const expect = require("chai").expect;
const recognize = require("../../services/recognizeServ");

describe("service/recognize", () => {
  describe("recognizeServ", () => {
    it("should add the amount of beerjars given to the total since last restart", () => {
      expect(recognize.respond(5)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #5 since last restart`
      );
      expect(recognize.respond(20)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #25 since last restart`
      );
      expect(recognize.respond(1000)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #1025 since last restart`
      );
      expect(recognize.respond(1)).to.equal(
        `You've gotten :cheers_to_the_beer_jar: #1026 since last restart`
      );
    });
  });

  describe("ReceiverIdsIn", () => {
    it("should find single user in message.", async () => {
      const text = ":cheers_to_the_beer_jar: <@TestUser> Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal(["TestUser"]);
    });

    it("should find multiple users in message.", async () => {
      const text =
        ":cheers_to_the_beer_jar: <@TestUser1> <@TestUser2> <@TestUser3> Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal(["TestUser1", "TestUser2", "TestUser3"]);
    });

    it("should get empty when no user is mentioned in message.", async () => {
      const text = ":cheers_to_the_beer_jar: TestUser Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal([]);
    });

    it("should get empty when user is mentioned incorrectly.", async () => {
      const text = ":cheers_to_the_beer_jar: @<TestUser1> Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal([]);
    });

    it("should find mentioned users even with some incorrectly mentioned in message.", async () => {
      const text =
        ":cheers_to_the_beer_jar: <@TestUser1> <@TestUser2> @<TestUser3> <@TestUser4> @TestUser5 Testing Message";
      const result = recognize.ReceiverIdsIn(text);
      expect(result).to.deep.equal(["TestUser1", "TestUser2", "TestUser4"]);
    });
  });
});
