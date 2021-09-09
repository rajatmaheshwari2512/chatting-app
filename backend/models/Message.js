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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", Message);
