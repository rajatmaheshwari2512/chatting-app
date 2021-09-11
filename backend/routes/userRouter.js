var express = require("express");
var uuid4 = require("uuid4");
var jwt = require("jsonwebtoken");

var verifyUser = require("../auth/verifyUser");

var User = require("../models/User");
var Room = require("../models/Room");

var router = express.Router();

router
  .post("/signup", (req, res) => {
    const { username, password } = req.body;
    var user = new User({ username: username, password: password });
    user
      .save()
      .then(() => {
        res.status(200).json({ message: "User Created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error in creating user" });
      });
  })
  .post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    User.findOne({ username: username, password: password }, { _id: 0, __v: 0 })
      .populate("rooms")
      .exec()
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Invalid Credentials" });
        } else {
          console.log(user);
          var token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
            expiresIn: "365d",
          });
          res
            .status(200)
            .json({ message: "Login Successful", token: token, user: user });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error in Login" });
      });
  })
  .post("/room", verifyUser, (req, res) => {
    Room.findOne({ roomid: req.body.roomid })
      .exec()
      .then((room) => {
        if (!room && !req.body.name) {
          res.status(401).json({ message: "Room does not exist" });
        } else if (!room) {
          var roomid = uuid4();
          var newRoom = new Room({
            roomid: roomid,
            name: req.body.name,
          });
          newRoom.save().then(() => {
            User.findOne({ username: req.user.user.username })
              .populate("rooms")
              .exec()
              .then((user) => {
                user.rooms.push(newRoom);
                user
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Room Created and Joined",
                      room: newRoom,
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({ message: "Error in Joining Room" });
                  });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Error in Finding User" });
              });
          });
        } else {
          User.findOne({ username: req.user.user.username })
            .populate("rooms")
            .exec()
            .then((user) => {
              user.rooms.push(room);
              user
                .save()
                .then(() => {
                  res.status(200).json({ message: "Room Joined", room: room });
                })
                .catch((err) => {
                  res.status(500).json({ message: "Error in Finding Room" });
                });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error in Finding Room" });
      });
  });

module.exports = router;
