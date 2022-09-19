'use strict';

const chai     = require("chai"), //inlucdeing what I need from chai explicitly
      should   = chai.should,
      exepect  = chai.expect,
      sinon    = require("sinon"),
      TabCount = require("../../features/tabCount.js"), // must inlucde thing to test
      MySql    = require('mysql2');

describe('TabCount', () => {
  afterEach(() => {
    sinon.restore();
  });


  let poolMock = sinon.createStubInstance(poolMock)
  var tabMock = sinon.mock(MySql);
  tabMock.expects("createPool").once().returns("");

  it('should pass', async() => {
    // spy getConnection
    var save = sinon.spy(tabMock.getConnection());
    // stub out GetTab withArgs(name)
    //var tab = sinon.createStubInstance(TabCount.GetTab('bob'));
    // spy mysql2.query
   // assert(TabCount.GetTab('bob'));
  });

});
