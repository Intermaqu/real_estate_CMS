var express = require("express");
const {
  getAllUsers,
  registerNewUser,
  login,
} = require("../controllers/userController");
var router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerNewUser);
router.post("/login", login);

module.exports = router;
