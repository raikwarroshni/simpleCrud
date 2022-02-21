const express = require("express");
const route = express.Router();

route.use("/user", require("./user"));
route.use("/auth", require("./auth"));

module.exports = route;
