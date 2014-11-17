var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { res.redirect('/#/app/welcome'); }
  else return next();
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Login' });
});

router.post('/', passport.authenticate('local', { successRedirect: '/account', failureRedirect: '/' }));

module.exports = router;
