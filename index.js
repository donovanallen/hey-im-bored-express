var express = require('express')
var parser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('./db/connection')
var http = require('http')
var app = express();
var restfulAPI = require("./eventful.js");
var UserEvent = mongoose.model("UserEvent");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs")

app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "view/",
  layoutsDir: "views/",
  defaultLayout: "layout"
}));

app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

var randomize = function(array) {
  return array[Math.floor(Math.random() * array.length)]
}

app.get("/", function(req, res){
  restfulAPI.options
  restfulAPI.request
  res.render("index")
})


app.listen(app.get("port"), function () {
  console.log("THIS WORKS OMG");
})
