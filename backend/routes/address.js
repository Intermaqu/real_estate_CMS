var express = require("express");
const passport = require("passport");
const { getAddressById2 } = require("../models/Address");
var router = express.Router();

router.post(
  "/getAddressById",
  passport.authenticate("jwt", { session: false }),
  getAddressById2
);

module.exports = router;