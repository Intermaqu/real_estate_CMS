var express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  registerNewUser,
  login,
  editUserById,
  deleteUserById
} = require("../controllers/userController");
var router = express.Router();

router.get("/", getAllUsers);
router.get("/getById/:id", getUserById);
router.get("/getByEmail/:email", getUserByEmail);
router.post("/register", registerNewUser);
router.post("/login", login);
// router.post("/edit/:id", editUserById);
router.delete('/delete/:id', deleteUserById);

module.exports = router;
