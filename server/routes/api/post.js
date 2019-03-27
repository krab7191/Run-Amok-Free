const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/note").post(postController.createNote);

router.route("/unameCheck").post(postController.checkUname);

router.post("/beverage", postController.createBeverage);

module.exports = router;
