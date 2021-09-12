var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    default: "",
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

module.exports = mongoose.model("User", User);
