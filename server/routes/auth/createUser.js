const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/user')
    .post(userController.registerUser);

module.exports = router;