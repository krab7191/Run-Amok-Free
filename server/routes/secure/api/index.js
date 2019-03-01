const router = require('express').Router();
// All private routes
const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./delete');

router.use('/get', get);
router.use('/post', post);
router.use('/put', put);
router.use('/delete', del);

module.exports = router;