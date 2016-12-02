var express = require('express')
var parser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('./db/connection')

var app = express();

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
app.use(parser.urlencoded({extended: true}));


var randomize = function(array) {
  return array[Math.floor(Math.random() * array.length)]
}

app.get("/", function(req, res){
  UserEvent.find({}).then(function(UserEvents){
      UserEvents = randomize(UserEvents)
      res.render("index", {
      UserEvents
    });
  })
});

app.listen(app.get("port"), function () {
  console.log("THIS WORKS OMG");
})
