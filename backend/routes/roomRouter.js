var express = require("express");
var router = express.Router();

var verifyUser = require("../auth/verifyUser");

var User = require("../models/Users");

router.use(verifyUser);
router.get("/", (req, res) => {
  User.findOne({ username: req.user.username })
    .populate("rooms")
    .exec()
    .then((user) => {
      res.json(user.rooms);
    });
});

module.exports = router;
