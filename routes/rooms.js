var express = require('express');
var db = require('../database/mongoconnector');
var Room = require('../database/schema/Room');
var redis = require('../database/redisconnector');

var router = express.Router();

/*
  This function allows the creation of a new OOH room
*/
router.post('/', function(req, res, next) {
  var course = req.body.course;
  var professor = req.body.professor;
  var TA_list = req.body.TA_list;
  if(!course || !professor) {
    res.status(400);
    res.send("Request data is incomplete!");
  } else {
    var newRoom = new Room({
      course: course,
      professor: professor,
      TA_list: TA_list
    });
    newRoom.save(function(err, theRoom) {
      if(err) {
        res.status(500);
        res.send("Unable to save information to database");
      } else {
        res.status(201);
        res.send({'roomid': theRoom._id, 'created_at': theRoom.created_at});
      }
    });
  }
});

/*
  This function allows the retrieval of the basic information of all the rooms
*/
router.get('/', function(req, res, next) {
  Room.find({}).lean().exec(function(err, rooms) {
    if(err) {
      res.status(500);
      res.send("MongDB Error: Unable to retrieve room information");
    } else {
      var transform = room => {
        room.roomid = room._id;
        delete room._id;
        delete room.__v;
        delete room.TA_list;
        return room;
      }
      rooms = rooms.map(transform);
      redis.keys('room:'+'*'+':status', function(err, activeRooms) {
        if(err) {
          res.status(500);
          res.send("Redis Error: Unable to retrieve room information");
        } else {
          var activeRooms = activeRooms.map(x => x.split(':')[1]);
          for(let room of rooms) { //room.roomid.id is of type Buffer, need to use toString('hex') for comparisoin. Currently inefficient, need improvement
            room.status = activeRooms.indexOf(room.roomid.id.toString('hex'))>-1 ? 'active':'inactive';
          }
          res.send(rooms);
        }
      });
    }
  });
});

module.exports = router;
