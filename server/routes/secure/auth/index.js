const router = require('express').Router();
// All AUTH routes
const get = require('./getUser');
const post = require('./createUser');
const put = require('./updateUser');
const del = require('./deleteUser');

router.use('/get', get);
router.use('/post', post);
router.use('/put', put);
router.use('/delete', del);

module.exports = router;