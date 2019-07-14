let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let tokenRoute = require("./routes/tokenRoute");
let userRoute = require("./routes/userRoute");
let codeRoute = require("./routes/codeRoute");
let code = require("./verifyCode");
let auth = require("./bAuth");
function main() {
  const express = require("express");
  const app = express();
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  const port = 3000;
  app.use("/token", auth.checkAuth, tokenRoute);
  app.use("/user", auth.checkAuth, code.verify, userRoute);
  app.use("/code", auth.checkAuth, codeRoute);

  app.listen(port, () => console.log(`Running AuthServer on port ${port}!`));
}
//mongoose
mongoose.connect("mongodb://localhost/portaldb", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected!");
});
main();
