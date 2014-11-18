var express = require('express');
var router = express.Router();

var serialPort = '/dev/ttyACM0';
var arduino = require('../firmataHandler').start(serialPort);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else res.redirect('/')
}
/* GET users listing. */
//router.use
router.post('/', ensureAuthenticated, function(req, res) {
  console.log('user', req.user.name, 'sent data:', req.body);
  switch(req.body.cmd) {
    case 'digitalWrite':
      arduino.pinMode(13, arduino.OUTPUT);
      arduino[req.body.cmd](req.body.pin, arduino[req.body.value]);
      break;
    case 'analogWrite':
      arduino.pinMode(req.body.pin, arduino.OUTPUT);
      arduino[req.body.cmd](req.body.pin, parseInt(req.body.value));
      arduino.analogWrite(9, 255);
      console.log(arduino.analogWrite);

  }
  res.send({success: true});
});

module.exports = router;
