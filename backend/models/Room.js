var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Message = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sent_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

var Room = new Schema({
  roomid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  messages: [Message],
});

module.exports = mongoose.model("Room", Room);
