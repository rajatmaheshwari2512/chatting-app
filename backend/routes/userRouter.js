var express = require("express");
var uuid4 = require("uuid4");
var jwt = require("jsonwebtoken");

var verifyUser = require("../auth/verifyUser");

const Users = require("../models/Users");
const Room = require("../models/Room");

var router = express.Router();

router
  .post("/signup", (req, res) => {
    const { username, password } = req.body;
    var user = new Users({ username: username, password: password });
    user
      .save()
      .then(() => {
        res.status(200).json({ message: "User Created" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error in creating user" });
      });
  })
  .post("/login", (req, res) => {
    const { username, password } = req.body;
    Users.findOne({ username: username, password: password })
      .populate("rooms")
      .exec()
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Invalid Credentials" });
        }
        jwt.sign({ user: user }, process.env.SECRET_KEY).then((token) => {
          res.status(200).json({ message: "Login Successful", token: token });
        });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error in Login" });
      });
  })
  .post("/room", verifyUser, (req, res) => {
    Room.findOne({ roomid: req.body.roomid })
      .exec()
      .then((room) => {
        if (!room) {
          var roomid = uuid4();
          var newRoom = new Room({
            roomid: roomid,
            name: req.body.name,
          });
          newRoom.save().then(() => {
            Users.findOne({ username: req.user.username }).then((user) => {
              user.rooms.push(roomid);
              user
                .save()
                .then(() => {
                  res.status(200).json({ message: "Room Created and Joined" });
                })
                .catch((err) => {
                  res.status(500).json({ message: "Error in Joining Room" });
                });
            });
          });
        }
        Users.findOne({ username: req.user.username })
          .exec()
          .then((user) => {
            user.rooms.push(req.body.roomid);
            user
              .save()
              .then(() => {
                res.status(200).json({ message: "Room Joined" });
              })
              .catch((err) => {
                res.status(500).json({ message: "Error in Joining Room" });
              });
          });
      });
  });

module.exports = router;
