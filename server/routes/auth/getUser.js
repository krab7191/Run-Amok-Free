const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/user')
    .get(userController.getUser);

module.exports = router;