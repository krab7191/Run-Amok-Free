const router = require('express').Router();
const userController = require('../../controllers/userController');

// Private GET routes here:
// router.get('/secureData', secureGetController.secureData);
router.route('/users')
    .get(userController.getAllUsers);

module.exports = router;