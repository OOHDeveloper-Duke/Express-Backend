var Redis = require('ioredis');

var connection = new Redis(80, 'super.datinker.com');

module.exports = connection;
