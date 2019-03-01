const router = require('express').Router();
// Only GET routes are public
const get = require('./get');

router.use('/get', get);

module.exports = router;