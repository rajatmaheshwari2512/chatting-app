var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var socketio = require("socket.io");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

var roomRouter = require("./routes/roomRouter");
var usersRouter = require("./routes/userRouter");

var User = require("./models/User");
var Room = require("./models/Room");

var app = express();

const server = require("http").createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 3000,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/chatting")
  .then((resp) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/rooms", roomRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "Some Error Occured" });
});

io.on("connect", (socket) => {
  console.log("Connected");
  socket.on("join", ({ username }) => {
    var rooms = [];
    User.findOne({ username: username })
      .populate("rooms")
      .exec()
      .then((user) => {
        var temp = user.rooms;
        for (var i = 0; i < temp.length; i++) {
          rooms.push(temp[i].roomid);
        }
        socket.join(rooms);
      });
  });
  socket.on("message", ({ currentMessage, currentRoom, username }) => {
    console.log(currentMessage, currentRoom, username);
    Room.findOne({ roomid: currentRoom })
      .populate("messages")
      .exec()
      .then((room) => {
        console.log(room.messages);
        room.messages.push({
          content: currentMessage,
          sent_by: username,
        });
        room.save();
        io.to(currentRoom).emit("message", {
          message: currentMessage,
          username: username,
          roomid: currentRoom,
        });
      });
  });
  socket.on("room", ({ roomid }) => {
    socket.join(roomid);
  });
});

module.exports = { app: app, server: server };
