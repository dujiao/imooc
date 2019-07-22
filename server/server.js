const express = require("express");
const utility = require("utility");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const UserRouter = require("./user");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", UserRouter);

app.listen(9093, function() {
  console.log("node app start");
});
