Code = require("../models/Code");
exports.genCode = (req, res, next) => {
  const accessCode = Math.random()
    .toString(36)
    .slice(2);
  // 3 days * 24h/day * 60min/hr * 60sec/min * 1000ms/sec
  var threeDaysFromNow = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  let code = new Code();
  code.accessCode = accessCode;
  code.expire = threeDaysFromNow;
  code.save(function(err) {
    if (err) {
      next(err);
    }
    return res.json({
      success: true,
      code: accessCode,
      expire: threeDaysFromNow
    });
  });
};
