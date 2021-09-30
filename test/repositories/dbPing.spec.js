const { expect } = require("chai");
const Chance = require("chance");
const sinon = require("sinon");
const { getPings } = require("../../repositories/pings");
const pool = require("../../repositories/pool");

describe("repositories/pings", () => {
  let chance;
  let sandBox;
  let returnValue;
  let queryStub;

  beforeEach(() => {
    chance = new Chance();
    returnValue = chance.integer();
    sandBox = sinon.createSandbox();
    queryStub = sandBox
      .stub()
      .onSecondCall()
      .resolves([
        [
          {
            pings: returnValue,
          },
        ],
      ]);
    sandBox.stub(pool, "grabConnection").returns({
      query: queryStub,
    });
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe("getPings", () => {
    it("should count the number of pings since database initalization", async () => {
      const pings = await getPings("user");
      expect(pings).to.equal(returnValue);
    });

    it("should increment the ping value for the user in the database", async () => {
      let aUser = chance.word();
      const pings = await getPings(aUser);
      expect(queryStub).to.have.callCount(2);
      expect(queryStub).to.have.been.calledWith({
        sql: "INSERT INTO profiles(name, pings) VALUES(?, 1) ON DUPLICATE KEY UPDATE pings = pings + 1",
        timeout: 30000, // 30s
        values: [aUser],
      });
    });

    it("should retreive the ping value for the user in the database", async () => {
      let aUser = chance.word();
      const pings = await getPings(aUser);
      expect(queryStub).to.have.callCount(2);
      expect(queryStub).to.have.been.calledWith({
        sql: "SELECT pings FROM profiles WHERE name = ?",
        timeout: 30000, // 30s
        values: [aUser],
      });
    });
  });
});
