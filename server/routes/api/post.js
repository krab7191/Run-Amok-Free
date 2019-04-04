const router = require("express").Router();
const postController = require("../../controllers/postController");
const userController = require("../../controllers/userController");

// Make sure every API call is authenticated but using passport local middleware
const passport = require("../../passport");

router.post("/note", userController.checkPermissions, postController.createNote);

router.route("/unameCheck").post(postController.checkUname);

router.post("/beverage", postController.createBeverage);

module.exports = router;
