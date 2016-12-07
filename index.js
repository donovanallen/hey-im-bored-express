var express = require('express')
var parser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('./db/connection')
var http = require('http')
var app = express();
var restfulAPI = require("./eventful.js");
var UserEvent = mongoose.model("UserEvent");
var UserInput = mongoose.model("UserInput");
var cors = require('cors');

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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

app.get("/api/events", function(req, res) {


  UserEvent.count().exec(function(err, count){
      var random = Math.floor(Math.random() * count);

      return UserEvent.findOne().skip(random).exec(
        function (err, result) {res.json(result)}
      )
      console.log("****" + result);

    });
});

app.post("/", function(req, res) {
  console.log("****************");
  console.log(req.body)
  let postal_code = req.body.postal_code;
  let catString = req.body.categories


  console.log("categories: " + catString);

  var options = {
      host : 'api.eventful.com',
      path : '/json/events/search?q=' + catString + '&l=' + postal_code + '&within=10&units=miles&t=Next+24+hours&page_size=20&app_key=' + restfulAPI.eventful_key
    }

    console.log(options.path + "!!!!!!!!!!");


  var request = http.get(options, function(response){
      var body = ""
      response.on('data', function(data) {
        body += data;
      });

      response.on('end', function() {
        var result = ((JSON.parse(body)).events.event);
        UserEvent.collection.insert(result)
      });
    });

  request.on('error', function(e) {
    // console.log('Problem with request: ' + e.message);
  });

  UserEvent.count().exec(function(err, count){
      var random = Math.floor(Math.random() * count);
      UserEvent.findOne().skip(random).exec(
        function (err, result) {
          console.log(result);
          res.render("index", {})
      });
    });

});

app.delete("/api/events", function(req, res){
  UserEvent.findOneAndRemove(req.event).then(function(){
    res.json({success: true});
  });
});


app.listen(app.get("port"), function () {
  console.log("THIS WORKS OMG");
})
