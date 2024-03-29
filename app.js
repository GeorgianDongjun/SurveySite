//- File name: app.js
//- Author's name: Dongjun Yu, Tomoya Kuroda
//- File description: Configure mongoose, passport.js and routing

require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GithubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(
  `mongodb+srv://user:user@cluster0-o0irn.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connection to mongoose successful'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Sesstion for persistent authentication
app.use(
  session({
    secret: 'tomoyakurodayangsudongjunyu',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize()); // Initiaize Passport first
app.use(passport.session()); // Use passport with session

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// use moment.js
app.locals.moment = require('moment');

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use google strategy for sign in
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (!err && !user) {
          const newgithub = new User({ ...profile, googleId: profile.id });
          newgithub.save();
          return cb(null, newgithub);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

// use Github strategy for sign in
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ githubId: profile.id }, function(err, user) {
        if (!err && !user) {
          const newgithub = new User(profile);
          newgithub.save();
          return cb(null, newgithub);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

// use static serialize and deserialize of model for passport session support
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
