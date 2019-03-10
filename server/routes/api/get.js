const router = require('express').Router();
const getController = require('../../controllers/getController');

// Private GET routes here:
// router.get('/secureData', secureGetController.secureData);
router.route('/notes')
    .get(getController.getAllNotes);
router.route('/bevs')
    .get(getController.getAllBevs);

module.exports = router;