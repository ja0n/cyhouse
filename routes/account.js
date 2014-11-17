var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else res.redirect('/')
}
/* GET users listing. */
//router.use
router.get('/#/', ensureAuthenticated, function(req, res) {
  res.render('account', { title: 'Menu', user: req.user.name });
});

module.exports = router;
