const router = require('express').Router();
const postController = require('../../controllers/postController');

router.route('/note')
    .post(postController.createNote);

module.exports = router;