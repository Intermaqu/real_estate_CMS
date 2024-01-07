var express = require("express");
const { getAllAddresses } = require("../controllers/addressController");
var router = express.Router();

router.get("/", getAllAddresses);

module.exports = router;
