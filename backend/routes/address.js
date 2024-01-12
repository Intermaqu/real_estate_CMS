var express = require("express");
const {
  getAllAddresses,
  addNewAddress,
  editAddressById,
  deleteAddressById,
  getAddressById,
} = require("../controllers/addressController");
var router = express.Router();

router.get("/", getAllAddresses);
router.get("/getById/:id", getAddressById);
router.post("/add", addNewAddress);
router.post("/edit/:id", editAddressById);
router.delete("/delete/:id", deleteAddressById);

module.exports = router;
