const dotenv=require("dotenv")
const express = require("express");
const mongoose = require("mongoose");
const app = express();

dotenv.config({path:'./config.env'})

const DB =process.env.DATABASE


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // UseCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false

  })
  .then(() => {
    console.log("succescful connectionm");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
const middleware = (req, res, next) => {
  console.log("middleware");
  next();
};

// middleware();

app.get("/", (req, res) => {
  res.send(`hello world`);
});
app.get("/home", (req, res) => {
  res.send(`home`);
});
app.get("/about", middleware, (req, res) => {
  res.send(`<h1>about</h1>`);
});

app.listen(3000, () => {
  console.log("server runing");
});
