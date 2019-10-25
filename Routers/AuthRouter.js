const Auth = require('express').Router();
const passport = require('passport');

Auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

Auth.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

Auth.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/story/');
})

Auth.get('/facebook', passport.authenticate('facebook', {
  scope: ['user_friends']
}));

Auth.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('http://localhost:3000/story/')
})

module.exports = Auth;
