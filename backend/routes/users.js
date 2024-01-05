var express = require("express");
const { registerNewUser, login } = require("../controllers/userController");
var router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", login);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
