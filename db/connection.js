var mongoose = require('mongoose')

var UserEventSchema = new mongoose.Schema(
  {
    postal_code: String,
<<<<<<< HEAD
     title: String,
     venue_address: String,
     description: String,
     url: String
=======
    title: String,
    venue_address: String,
    description: String,
    url: String
>>>>>>> 7e5648fbf136443ef5f30e7a9ba09fe11bf00480
  }
)



mongoose.model("UserEvent", UserEventSchema);
mongoose.connect("mongodb://localhost/heyimbored");

module.exports = mongoose;
