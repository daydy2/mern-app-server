const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const colors = require("colors");
require("dotenv").config();
const errorMid = require("./middleware/errorMid");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  //res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", require('./routes/route'));

app.use(errorMid);

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(result => {
  app.listen(process.env.PORT)
  console.log(`Connected to DB on port ${process.env.PORT}`.bold)
  console
}).catch(err => {
  console.log(colors.blue(err))
})
