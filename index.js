var express = require('express')
var parser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('./db/connection')
var http = require('http')
var app = express();
var restfulAPI = require("./eventful.js");
var UserEvent = mongoose.model("UserEvent");

app.set("port", process.env.PORT || 4001);
app.set("view engine", "hbs")

app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "view/",
  layoutsDir: "views/",
  defaultLayout: "layout"
}));


app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));



app.get("/", function(req, res) {
  restfulAPI.options;
  restfulAPI.request;
  UserEvent.count().exec(function(err, count){

      var random = Math.floor(Math.random() * count);
      UserEvent.findOne().skip(random).exec(
        function (err, result) {

          res.render("index", {
            title: result.title,
            location: result.venue_address
          })
      });
    });

});

app.listen(app.get("port"), function () {
  console.log("THIS WORKS OMG");
})
