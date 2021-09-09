var express = require("express");
var router = express.Router();

var verifyUser = require("../auth/verifyUser");

var User = require("../models/Users");

router.use(verifyUser);
router.get("/", (req, res) => {
  User.findOne({ username: req.user.username })
    .populate({
      path: "rooms",
      populate: { path: "messages" },
    })
    .exec()
    .then((user) => {
      console.log(user);
      res.json(user.rooms);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Some Error Occured" });
    });
});

module.exports = router;
