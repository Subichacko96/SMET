const chalk = require('chalk');
const passport = require('passport');
const CONSTANTS = require('../utils/constants');
const userHelper = require('../helpers/app/userHelper');

// Add Admin account if doesn't exist

const generateAdminAccount = async () => {
  const user = {
    name: 'Admin User',
    email: 'admin@cloudcity.com',
    role: CONSTANTS.ADMIN,
    password: process.env.ADMIN_PASSWORD,
  };
  try {
    await userHelper.generateAdminUser(user);
    console.log(
      chalk.green(
        `Admin Added with mail: ${user.email} pass: ${process.env.ADMIN_PASSWORD}`
      )
    );
  } catch (error) {
    if (error.code === 11000) {
      return console.log(chalk.yellow('Account already exist'));
    }
    console.log(
      chalk.red('Error occured while adding admin account'),
      error.message
    );
  }
};

exports.generateAdminAccount = generateAdminAccount; // another way of exporting

exports.login = (req, res) => {
  return res.render('login', {
    title: 'Login',
    user: 'Admin',
  });
};

exports.authenticateUser = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('errors', {
        msg: 'Sorry the email or password is incorrect',
      });
      return next(err);
    }
    if (!user) {
      req.flash('errors', {
        msg: 'Sorry the email or password is incorrect',
      });
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash('errors', {
          msg: 'Sorry the email or password is incorrect',
        });
        return res.redirect('/login');
      }
      if (user.role === CONSTANTS.ADMIN) {
        req.flash('success', {
          msg: 'Success! You are logged in.',
        });
        res.redirect('/admin/dashboard');
      } else if (user.role === CONSTANTS.CASHIER) {
        req.flash('success', {
          msg: 'Success! You are logged in.',
        });
        res.redirect('/cashier/dashboard');
      } else if (user.role === CONSTANTS.WAITER) {
        req.flash('success', {
          msg: 'Success! You are logged in.',
        });
        res.redirect('/waiter/dashboard');
      } else if (user.role === CONSTANTS.KITCHEN) {
        req.flash('success', {
          msg: 'Success! You are logged in.',
        });
        res.redirect('/kitchen/dashboard');
      }
    });
  })(req, res, next);
};
exports.forgot = (req, res) => {
  return res.render('forgotpassword', {
    title: 'Forgot Password',
  });
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err)
      console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.redirect('/login');
  });
};

exports.homePage = (req, res) => {
  return res.render('frontend');
};
