var express = require("express");

const { addNewCompanyInfo, getAllCompanyInfo, getOne, edit } = require("../controllers/companyInfoController");
var router = express.Router();

router.post("/addNewCompanyInfo", addNewCompanyInfo);
router.post("/edit/:id", edit);
router.get("/getAllCompanyInfo", getAllCompanyInfo);
router.get("/getOne", getOne);

module.exports = router;