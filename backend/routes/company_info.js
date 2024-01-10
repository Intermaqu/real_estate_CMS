var express = require("express");

const { addNewCompanyInfo, getAllCompanyInfo } = require("../controllers/companyInfoController");
var router = express.Router();

router.post("/addNewCompanyInfo", addNewCompanyInfo);
router.get("/getAllCompanyInfo", getAllCompanyInfo);

module.exports = router;