let tokenRouter = require("express").Router();
var loginController = require("../controllers/loginController");
var verifyToken = require("../controllers/verifyToken");

tokenRouter.route("/").post(loginController.login);
tokenRouter.route("/verify").post(verifyToken.checkToken);

module.exports = tokenRouter;
