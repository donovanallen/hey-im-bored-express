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

var UserInputSchema = new mongoose.Schema(
  {
    postal_code: String,
    categories: String
  }
)


mongoose.model("UserEvent", UserEventSchema);
mongoose.model("UserInput", UserInputSchema);
mongoose.connect("mongodb://localhost/heyimbored");

module.exports = mongoose;
