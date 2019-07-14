var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

// Export Contact model
var PortalUser = (module.exports = mongoose.model(
  "portalUser",
  userSchema,
  "portalUser"
));

module.exports.get = function(callback, limit) {
  PortalUser.find(callback).limit(limit);
};
