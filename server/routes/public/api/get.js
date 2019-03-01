const router = require('express').Router();
const getController = require('../../../controllers/getController');

// Public data routes here:

router.get('/test', getController.test);

module.exports = router;