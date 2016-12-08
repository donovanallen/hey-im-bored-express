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

var SnarkyCommentsSchema = new mongoose.Schema(
  {
    comment: String,
  }
)


mongoose.model("UserEvent", UserEventSchema);
mongoose.model("SnarkyComments", SnarkyCommentsSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URI);
}else{
  mongoose.connect("mongodb://localhost/heyimbored");
}

module.exports = mongoose;
