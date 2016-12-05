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

app.get("/", function(req, res) {
  var options = {
      host : 'api.eventful.com',
      path : '/json/events/search?q=family&l=San+Francisco&app_key=' + restfulAPI.eventful_key
    }

  var request = http.get(options, function(response){
      var body = ""
      response.on('data', function(data) {
        body += data;
      });

      response.on('end', function() {
        // move body data into mongodb
        var result = ((JSON.parse(body)).events.event);
        console.log("*******************");
        console.log('this is result from response.on: ', result)
        UserEvent.collection.insert(result)
      });
    });

  request.on('error', function(e) {
    console.log('Problem with request: ' + e.message);
  });


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
    // console.log("dfhi")

});



app.listen(app.get("port"), function () {
  console.log("THIS WORKS OMG");
})
