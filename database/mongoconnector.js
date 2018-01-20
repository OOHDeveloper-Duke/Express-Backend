var mongoose = require('mongoose');

var connection = mongoose.createConnection('mongodb://super.datinker.com/OOH');

module.exports = connection;
