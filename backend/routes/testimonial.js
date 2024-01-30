var express = require("express");
const passport = require("passport");
require("./../config/passport")(passport);

const {
  getAll,
  add,
  getById,
  editById,
} = require("../controllers/testimonialController");
var router = express.Router();

router.get("/", getAll);
router.get("/getById", getById);
router.post(
  "/add",
  // passport.authenticate("jwt", { session: false }),
  add
);
router.post("/editById/:id", editById);

module.exports = router;
