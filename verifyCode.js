Code = require("./models/Code");
let verify = (req, res, next) => {
  Code.findOne({ accessCode: req.body.accessCode }, function(err, code) {
    if (err || !code) {
      res.status(400);
      res.json({
        success: false,
        message: "invalid access code"
      });
    } else {
      now = new Date().getTime();
      if (code.expire < now) {
        res.status(403);
        res.json({
          success: false,
          message: "access code expired"
        });
        Code.deleteOne({ accessCode: code.accessCode }, function(err) {
          if (err) {
            next(err);
          }
        });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  verify: verify
};
