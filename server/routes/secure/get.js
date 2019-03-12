const router = require('express').Router();
const getController = require('../../controllers/getController');

// Private GET routes here:
// router.get('/secureData', secureGetController.secureData);
router.route('/user')
    .get(getController.getAllUsers);

module.exports = router;