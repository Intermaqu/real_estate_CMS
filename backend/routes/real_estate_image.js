var express = require("express");

const { getById, add, editById, deleteById } = require("../models/RealEstateImage");
var router = express.Router();

router.get("/getById/:id", getById);
router.post("/add", add);
router.post("/editById/:id", editById);
router.post("/deleteById/:id", deleteById);


module.exports = router;