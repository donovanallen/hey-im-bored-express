var express = require('express')
var parser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('./db/connection')
var http = require('http')
var app = express();
var dotenv = require('dotenv').config()
var restfulAPI = process.env.eventful_key;
var UserEvent = mongoose.model("UserEvent");
var SnarkyComments = mongoose.model("SnarkyComments");
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
  console.log("************************** " + process.env);

  UserEvent.count().exec(function(err, count){

      var random = Math.floor(Math.random() * count);
      var randomComment = Math.floor(Math.random() * 5);

      if(count === 0){
        SnarkyComments.findOne().skip(randomComment).exec(
         function (err, result) {res.json(result)}
       )
      }
      else {
        return UserEvent.findOne().skip(random).exec(
          function (err, result) {res.json(result)}
        )
      }

    });
});

app.post("/api/events", function(req, res) {
  UserEvent.collection.remove({})

  let postal_code = req.body.postal_code;
  let catString = req.body.categories

  let location = postal_code.split(" ").join("+")

  var options = {
      host : 'api.eventful.com',
      path : '/json/events/search?c=' + catString + '&l=' + location + '&within=10&units=miles&t=Today&page_size=20&app_key=' + restfulAPI
    }

    console.log("&&&&&&&&&&&&&&&& " + eventful_key);

console.log(options.path + "******************")
  var request = http.get(options, function(response){
      var body = ""
      response.on('data', function(data) {
        body += data;
      });

      response.on('end', function() {
        var result = ((JSON.parse(body)).events.event);
        UserEvent.collection.insert(result)
        res.json("bob")
      });
    });

  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
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
