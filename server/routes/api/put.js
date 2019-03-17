const router = require('express').Router();
const putController = require('../../controllers/putController');

// Define our routes for changing data...

// .put('/api/put/beverageChanges', { _id: id, changes: changes });
router.route('/beverageChanges')
    .put(putController.changeBeverage);

module.exports = router;