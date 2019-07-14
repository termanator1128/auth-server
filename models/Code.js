var mongoose = require("mongoose");

var codeSchema = mongoose.Schema({
  accessCode: String,
  expire: String
});

// Export Contact model
var Code = (module.exports = mongoose.model("Code", codeSchema, "Code"));

module.exports.get = function(callback, limit) {
  Code.find(callback).limit(limit);
};
