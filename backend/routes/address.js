var express = require("express");
const { getAllAddresses, addNewAddress, editAddressById, deleteAddressById } = require("../controllers/addressController");
var router = express.Router();

router.get("/", getAllAddresses);
router.post("/add", addNewAddress);
router.post("/edit/:id", editAddressById);
router.delete('/delete/:id', deleteAddressById);


module.exports = router;
