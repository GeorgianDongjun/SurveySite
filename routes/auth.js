const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Render Login Form
router.get('/login', (req, res) =>
  res.render('login', { buttonText: 'Login' })
);

// Handle Login Form Submission
router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
    }),
    function(req, res) {
      res.redirect(`/users/${req.user.username}/surveys`);
   }
    
);
// Render Register Form
router.get('/register', (req, res) =>
  res.render('register', { buttonText: 'Register' })
);

//Handle Register Form Submission
router.post('/register', (req, res) => {
  var newUser = new User({username: req.body.username});
  newUser.firstname = req.body.firstname;
  newUser.lastname = req.body.lastname;
  newUser.email = req.body.email;
  User.register(newUser, req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        return res.render('register', { account: account });
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect(`/users/${req.user.username}/surveys`);
      });
  });
});

// Log out
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});
module.exports = router;