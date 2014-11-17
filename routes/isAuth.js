var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  console.log(req.isAuthenticated());
  res.send({auth: req.isAuthenticated()});

});

module.exports = router;
