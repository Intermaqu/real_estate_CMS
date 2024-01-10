var express = require("express");

const { addNewSectionActiveInfo, getAllSectionActiveInfo } = require("../controllers/sectionActiveInfoController");
var router = express.Router();

router.post("/addNewSectionActiveInfo", addNewSectionActiveInfo);
router.get("/getAllSectionActiveInfo", getAllSectionActiveInfo);

module.exports = router;