var mongoose = require("./connection");

var UserEvent = mongoose.model("UserEvent")

var seedData = [
  {
    "zipcode": "20052",
    "category": "music",
    "eventName": "Bono Goes Solo: Live",
    "eventLocation": "1234 Cool St",
    "eventTime": "21:00",
    "eventDate": "01-01-2017",
    "eventDescription": "U2 is Sad. Bono's gettin' rich. Come check it out.",
    "eventUrl": "http://www.google.com"
  },
  {
    "zipcode": "20002",
    "category": "family",
    "eventName": "Barney and Friends learn to Clean",
    "eventLocation": "8476 Purple Ave",
    "eventTime": "22:00",
    "eventDate": "02-06-2017",
    "eventDescription": "Your fave purple dinosaur teaches your kids how to clean the house",
    "eventUrl": "http://www.barney.com"
  },
  {
    "zipcode": "20004",
    "category": "sports",
    "eventName": "Washington Mystics v. Phoenix Stars",
    "eventLocation": "12 Blue St",
    "eventTime": "19:00",
    "eventDate": "03-05-2017",
    "eventDescription": "WNBA Action",
    "eventUrl": "http://www.wnba.com"
  }
]

UserEvent.remove({}).then(function(){
  UserEvent.collection.insert(seedData).then(function(){
    process.exit();
  })
})
