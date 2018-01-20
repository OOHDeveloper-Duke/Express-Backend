var Schema = require('mongoose').Schema;
var connection = require('../mongoconnector');

/*
roomid will be the mongodb-autogenerated _id field
*/
var RoomSchema = new Schema({
  course: String,
  professor: [String],
  TA_list: {type: [String], default: []},
  created_at: {type: Date, default: Date.now}
});

var RoomModel = connection.model('Room', RoomSchema);

module.exports = RoomModel;
