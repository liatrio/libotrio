const chai     = require("chai"), //inlucdeing what I need from chai explicitly
      should   = chai.should,
      exepect  = chai.expect,
      sinon    = require("sinon"),
      TabCount = require("../../features/tabCount.js"); // must inlucde thing to test
var MySql    = require("mysql2"); // included seporately because I think connection needs mutability

describe('TabCount', () => {
  const mySqlConnection = MySql.createConnection({ //database info does not really matter as this is a mock up
    host: 'localhost',
    user: 'root',
    database: 'test'
  });
  var mySqlMock = sinon.mock(mySqlConnection); // tell sinon this is a mock db connection
  var tabCount = new TabCount(mySqlConnection); // sinon will intercept this pathway

  it('should query for a user and return all apperances', function() {
    const name = 'Evan Drake';
    const results = [{name: name, tab: 0}];
    const fields = ['name', 'tab'];
    var expectation = mySqlMock.expects('query') //mySqlMock intercepts query and checks it
      .withArgs('select * from users where name = ?', [ name ])
      .callsArgsWith(2, null, results, fields);

    return tabCount.GetTab(name).should.eventually.become(results[0]); // this line checks that the query would actually run
  });
});
