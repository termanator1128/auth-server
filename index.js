let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let api = require("./api");
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

  app.use("/", api);

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
