const express = require('express');
const router = express.Router();

const passportConfig = require('../config/passport');
const authController = require('../controllers/auth');

//Login Routes
router.get('/', authController.homePage);
router.get('/login', authController.login);
router.post('/login', authController.authenticateUser);
//forgot
router.get('/forgotpassword', authController.forgot);
//Log out
router.get('/logout', authController.logout);

module.exports = router;
