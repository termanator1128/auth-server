AuthUser = require("./models/AuthUser");
const bcrypt = require("bcrypt");

let checkAuth = (req, res, next) => {
  const auth64 = req.headers["authorization"];
  if (!auth64) {
    requireCredentials(res);
  } else {
    authSplit = getIDAndSecret(auth64, res);
    const clientID = authSplit[0];
    const clientSecret = authSplit[1];
    AuthUser.findOne({ username: clientID }, function(err, user) {
      if (err || !user) {
        notAuthorized(res);
      } else {
        let dbPassword = user.password;
        if (bcrypt.compareSync(clientSecret, dbPassword)) {
          next();
        } else {
          notAuthorized(res);
        }
      }
    });
  }
};
let requireCredentials = res => {
  res.status(401);
  res.json({
    success: false,
    message: "Authentication required"
  });
};

let notAuthorized = res => {
  res.status(401);
  res.json({
    success: false,
    message: "Invalid Credentials"
  });
};

let getIDAndSecret = (auth64, res) => {
  const auth = Buffer.from(auth64.replace("Basic ", ""), "base64").toString(
    "ascii"
  );
  const authSplit = auth.split(":");
  if (authSplit.length !== 2) {
    notAuthorized(res);
  }
  return authSplit;
};

module.exports = {
  checkAuth: checkAuth
};
