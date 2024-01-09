var express = require("express");
const {
  getAllRealEstateOffers,
  addNewRealEstate,
} = require("../controllers/realEstateController");
var router = express.Router();

router.get("/", getAllRealEstateOffers);
router.post("/newRealEstate", addNewRealEstate);

module.exports = router;
