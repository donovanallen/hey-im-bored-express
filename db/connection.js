var mongoose = require('mongoose')

var UserEventSchema = new mongoose.Schema(
  {
    zipcode: String,
    category: String,
    eventName: String,
    eventLocation: String,
    eventTime: String,
    eventDate: String,
    eventDescription: String,
    eventUrl: String
  }
)

var UserSelections = []

mongoose.model("UserEvent", UserEventSchema);
mongoose.connect("mongodb://localhost/heyimbored");

module.exports = mongoose;
