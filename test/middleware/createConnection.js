'use strict';

const MySql = require("mysql2"),
      CrtPool = require("../../middleware/createConnection"),
      chai = require("chai"),
      sinon = require("sinon");

describe("test createConnection", () => {
  sinon.restore();

  poolMock = sinon.spy(CrtPool, "CreatePool");

  it("testing CreatePool", async () => {
    chai.expect(poolMock.called());
  });
});
