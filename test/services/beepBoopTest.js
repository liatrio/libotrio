const expect = require("chai").expect;
const sinon = require("sinon");
const beepBoop = require("../../services/beepBoopServ").respond;
const dbops = require("../../repositories/databaseops");
const MySql = require("mysql2/promise");

describe("service/beepBoop", () => {
  describe("beepBoopServ", () => {
    it("should count the number of boops since last restart", () => {
      expect(beepBoop()).to.equal(`BOOP #1 since last restart`);
      expect(beepBoop()).to.equal(`BOOP #2 since last restart`);
      expect(beepBoop()).to.equal(`BOOP #3 since last restart`);
    });
  });
  describe("databaseOps", () => {
    beforeEach(
      ()=>{
        sinon.restore()
        poolMock = sinon.stub(MySql, "createPool")
    });
    it("mocking db connection", () => {
      dbops.setupPool();
      expect(poolMock).to.have.been.calledOnce;
    });
  });
  
});
