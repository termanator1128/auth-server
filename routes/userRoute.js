let userRouter = require("express").Router();
var createController = require("../controllers/createController");

userRouter.route("/").post(createController.createNewAccount);

module.exports = userRouter;
