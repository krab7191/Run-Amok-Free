const router = require('express').Router();
const deleteController = require('../../controllers/deleteController');

router.route('/beverage/:id')
    .delete(deleteController.deleteBevById);

module.exports = router;