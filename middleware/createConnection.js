'use strict';

const MySql = require("mysql2");

CreatePool = () => {
  return MySql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'database',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

module.exports = {CreatePool};
