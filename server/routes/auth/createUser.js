const router = require('express').Router();
const passport = require('../../passport');
const userController = require('../../controllers/userController');

router.route('/user')
    .post(userController.auth, passport.authenticate('local'), userController.authenticate);
router.route('/signup')
    .post(userController.registerUser);
router.route('/logout')
    .post(userController.logout);

module.exports = router;