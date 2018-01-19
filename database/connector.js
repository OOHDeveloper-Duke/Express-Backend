var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://super.datinker.com/room');

module.exports = connection;
