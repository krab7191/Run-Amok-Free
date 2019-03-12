const path = require("path");
const router = require("express").Router();
const api = require("./api");
const admin = require("./secure/get");
const auth = require("./auth");

// Public data routes
router.use("/api", api);

// Administrator routes
router.use("/admin", admin);

// Authentication routes
router.use("/auth", auth);

// If no routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
