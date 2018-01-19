var express = require('express');
var router = express.Router();

/* Server Test Page */
router.get('/', function(req, res, next) {
  res.send('Hello World!')
});

module.exports = router;
