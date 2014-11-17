var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { res.redirect('/account'); }
  else return next();
}

router.post('/', function(req, res, next) {
  passport.authenticate('local', { session: true }, function(err, user, info) {
    if(err) return res.json({ auth: false, msg: 'Algum erro aconteceu.', error: err});
    if(!user) return res.json({ auth: false, msg: 'Usuário ou senha incorreta.' });
    req.logIn(user, function(err) {
      if(err) return res.json({ auth: false, msg: 'Algum erro aconteceu.', error: err });
      return res.json({ auth: true, msg: 'Logado com sucesso.', user: user.name });
    });
  })(req, res, next);
});

module.exports = router;
