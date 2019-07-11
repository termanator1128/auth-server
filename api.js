let router = require("express").Router();
var loginController = require("./loginController");
var verifyToken = require("./verifyToken");

router.route("/token").post(loginController.login);
router.route("/verify").post(verifyToken.checkToken);

module.exports = router;
