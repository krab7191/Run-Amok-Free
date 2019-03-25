const router = require('express').Router();
const getController = require('../../controllers/getController');

// Private GET routes here:
router.get('/notes/:_id', getController.getAllNotes);

router.route('/allBeverages')
    .get(getController.getAllBeverages);

router.route('/bevs/avail')
    .get(getController.getAvailBevs);

module.exports = router;