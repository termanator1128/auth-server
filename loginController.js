User = require("./user");
let jwt = require("jsonwebtoken");
exports.login = function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    User.findOne({ username: username }, function(err, user) {
      if (err || !user) {
        res.status(403);
        res.json({
          success: false,
          message: "Incorrect username or password"
        });
      } else {
        let dbUsername = user.username;
        let dbPassword = user.password;
        if (username === dbUsername && password === dbPassword) {
          let token = jwt.sign({ username: username }, process.env.SECRET, {
            expiresIn: "24h" // expires in 24 hours
          });
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token
          });
        } else {
          res.status(403);
          res.json({
            success: false,
            message: "Incorrect username or password"
          });
        }
      }
    });
  } else {
    res.status(400);
    res.json({
      success: false,
      message: "Authentication failed! Please check the request"
    });
  }
};
