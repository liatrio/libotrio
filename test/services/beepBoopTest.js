const expect = require("chai").expect;
const beepBoop = require("../../services/beepBoopServ").respond;

describe("service/beepBoop", () => {
  describe("beepBoopServ", () => {
    it("should count the number of boops since last restart", () => {
      expect(beepBoop()).to.equal(`BOOP #1 since last restart`);
      expect(beepBoop()).to.equal(`BOOP #2 since last restart`);
      expect(beepBoop()).to.equal(`BOOP #3 since last restart`);
    });
  });
});
