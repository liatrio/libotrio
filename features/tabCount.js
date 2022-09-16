'use strict';

const { resolveConfig } = require("prettier");

function TabCount(mySqlConnection) {
    this.connect = mySqlConnection; // make connection to database in object constructor
}

TabCount.prototype.GetUserByName = async function(name) {
    var self = this;
    var query = 'select * from users where name = ?';
    var params = [ name ];

    // This promise is utilized to send a query to the database and store the result in result
    var promise = new Promise(function(resolve, reject) {
      self.connection //the self in question is TabCount Object
      .query(query, params, function(error, results, fields) {
         if (error) reject(new Error(error)); // errors if connection is rejected
         resolve(results[0]);
      });
    });
}

module.exports = TabCount;
