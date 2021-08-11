const express = require("express");
const cors = require("cors");
const routers = require("./routers");
const { errors } = require("celebrate");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);
app.use(errors());

module.exports = app;
