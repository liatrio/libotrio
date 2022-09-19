'use strict';

const chai     = require("chai"), //inlucdeing what I need from chai explicitly
      should   = chai.should,
      exepect  = chai.expect,
      sinon    = require("sinon"),
      TabCount = require("../../features/tabCount.js"), // must inlucde thing to test
      MySql    = require('mysql2');

describe('TabCount', () => {
  //afterEach(() => {
    sinon.restore();
  //});

  var tabMock = sinon.mock(MySql);
  console.log(tabMock)
  tabMock.expects("createPool").once().returns("");
  let poolMock = sinon.stub(tabMock);

  it('should pass', async() => {

    const callback = sinon.spy();



    // spy getConnection
    // stub out GetTab withArgs(name)
    // spy mysql2.query
   TabCount.GetTab('bob');
  });

});
