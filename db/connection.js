var mongoose = require('mongoose')

var UserEventSchema = new mongoose.Schema(
  {
    postal_code: String,
    title: String,
    venue_address: String,
    description: String,
    url: String
  }
)

var UserSelections = []

mongoose.model("UserEvent", UserEventSchema);
mongoose.connect("mongodb://localhost/heyimbored");

module.exports = mongoose;
