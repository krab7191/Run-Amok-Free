const router = require('express').Router();
const deleteController = require('../../controllers/deleteController');

router.route('/beverage/:id')
    .delete(deleteController.deleteBevById);
router.route('/note/:id')
    .delete(deleteController.deleteNoteById);

module.exports = router;