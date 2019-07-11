var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

// Export Contact model
var User = (module.exports = mongoose.model("user", userSchema, "user"));

module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
