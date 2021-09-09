var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Room = new Schema({
  roomid: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = mongoose.model("Room", Room);
