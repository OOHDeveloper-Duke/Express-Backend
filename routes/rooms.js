var express = require('express');
var db = require('../database/connector');
var Room = require('../database/schema/Room');

var router = express.Router();

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

module.exports = router;
