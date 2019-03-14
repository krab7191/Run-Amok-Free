const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/user/:email')
    .get(userController.signin)

module.exports = router;