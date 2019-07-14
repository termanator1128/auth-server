var mongoose = require("mongoose");

var authUserSchema = mongoose.Schema({
  username: String,
  password: String
});

// Export Contact model
var AuthUser = (module.exports = mongoose.model(
  "AuthUser",
  authUserSchema,
  "AuthUser"
));

module.exports.get = function(callback, limit) {
  AuthUser.find(callback).limit(limit);
};
