PortalUser = require("../models/PortalUser");
Code = require("../models/Code");
const bcrypt = require("bcrypt");
exports.createNewAccount = function(req, res) {
  let username = req.body.username;
  let unencryptedPassword = req.body.password;
  let accessCode = req.body.accessCode;
  if (username && unencryptedPassword && accessCode) {
    PortalUser.findOne({ username: username }, function(err, user) {
      if (err) {
        console.log("omg2");
        res.status(500);
        res.json({
          success: false,
          status: "ERROR",
          message: "Something broke"
        });
      } else if (user) {
        res.status(400);
        res.json({
          success: false,
          status: "EXISTS",
          message: "That user already exists"
        });
      } else {
        let portalUser = new PortalUser();
        portalUser.username = username;
        const password = bcrypt.hashSync(unencryptedPassword, 10);
        portalUser.password = password;
        portalUser.save(function(err) {
          if (err) {
            res.status(500);
            res.json({
              success: false,
              status: "ERROR",
              message: "Something broke"
            });
          } else {
            res.json({
              success: true,
              message: "Portal user successfully created"
            });
            Code.deleteOne({ accessCode: accessCode }, function(err) {});
          }
        });
      }
    });
  } else {
    res.status(400);
    res.json({
      success: false,
      status: "BAD",
      message: "Invalid user, missing required information"
    });
  }
};
