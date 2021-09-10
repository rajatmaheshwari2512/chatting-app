var express = require("express");
var router = express.Router();

var verifyUser = require("../auth/verifyUser");
const Room = require("../models/Room");

var User = require("../models/Users");

router.use(verifyUser);
router
  .get("/", (req, res) => {
    User.findOne({ username: req.user.username })
      .populate("rooms")
      .exec()
      .then((user) => {
        console.log(user);
        res.json(user.rooms);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Some Error Occured" });
      });
  })
  .get("/messages/:roomid", (req, res) => {
    const roomid = req.params.roomid;
    Room.findOne({ roomid: roomid })
      .populate("messages")
      .exec()
      .then((room) => {
        res.json(room.messages);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Some Error Occured" });
      });
  });

module.exports = router;
