const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const _ = require('lodash');
const CONSTANTS = require('../utils/constants');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        return done(null, false, {
          msg:
            'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.',
        });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === CONSTANTS.ADMIN) {
    return next();
  }
  req.flash('errors', { msg: 'Unauthorized' });
  res.redirect('/login');
};

exports.isCashier = (req, res, next) => {
  if (req.user.role === CONSTANTS.CASHIER) {
    return next();
  }
  req.flash('errors', { msg: 'Unauthorized' });
  res.redirect('/login');
};

exports.isWaiter = (req, res, next) => {
  if (
    req.user.role === CONSTANTS.WAITER ||
    req.user.role === CONSTANTS.CASHIER
  ) {
    return next();
  }
  req.flash('errors', { msg: 'Unauthorized' });
  res.redirect('/login');
};

exports.isKitchen = (req, res, next) => {
  if (req.user.role === CONSTANTS.KITCHEN) {
    return next();
  }
  req.flash('errors', { msg: 'Unauthorized' });
  res.redirect('/login');
};
