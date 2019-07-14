let codeRouter = require("express").Router();
var accessController = require("../controllers/accessController");

codeRouter.route("/").post(accessController.genCode);

module.exports = codeRouter;
