var express = require("express");

const { addRealEstateImage, getRealEstateImageById } = require("../models/RealEstateImage");
var router = express.Router();

router.post("/addRealEstateImage", addRealEstateImage);

router.post("/getRealEstateImageById", getRealEstateImageById);

module.exports = router;