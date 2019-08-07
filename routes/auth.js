//- File name: auth.js
//- Author's name: Dongjun Yu
//- File description: route file for login, register, log out, and profile

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Render Login Form
router.get('/login', (req, res) =>
  res.render('login', { buttonText: 'Login', title: 'True Survey | Login' })
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
  res.render('register', { buttonText: 'Register', title: 'True Survey | Sign up' })
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

// Profile
router.get('/profile', (req, res) => {  
  if(!req.user){
    res.redirect('/')
  }
  res.render('profile', {
    user: req.user, title: 'True Survey | Profile'
  });
});

// Edit Profile
router.get('/:id/editProfile', (req, res) => {
  if(!req.user){
    res.redirect('/')
  }
  res.render('editProfile', {
    user: req.user, title: 'True Survey | Edit Profile'
  });
});
  
// Handle Profile Edit form
router.post('/:id/editProfile', function(req, res) {
  User.findById(req.user.id, function (err, user) {
    if(!user) {
      req.flash('error', 'No account found');
      return res.redirect('/profile');
    }

    var firstname = req.body.firstname.trim();
    var lastname = req.body.lastname.trim();
    var email = req.body.email.trim();

    if (!firstname || !lastname || !email) {
      req.flash('error', 'One or more fields are empty');
      return res.redirect('/edit'); // modified
    }
    
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;

    // don't forget to save!
    user.save(function (err) {

        console.log(err);

        res.redirect('/profile');
    });
  });
});

module.exports = router;