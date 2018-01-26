var express = require('express');
var db = require('../database/mongoconnector');
var Room = require('../database/schema/Room');
var redis = require('../database/redisconnector');
var crypto = require('crypto');

var router = express.Router();

/*
  This function allows the authentication of users, for now it is just a dummy login
*/
router.post('/', function(req, res, next) {
  var netid = req.body.netid;
  var password = req.body.password;
  if(!password || !netid) {
    res.status(400);
    res.send("Request data is incomplete");
  } else {
    var hexHash = crypto.createHash('md5').update(netid).digest("hex");
    if(hexHash==password) {
      res.status(200);
      res.send({netid: netid, authentication: "successful"});
    } else {
      res.status(200);
      res.send({netid: netid, authentication: "unsuccessful"});
    }
  }
});

module.exports = router;
