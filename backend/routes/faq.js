var express = require("express");

const { addNewFaq, getAllFaqs, getFaqById } = require("../controllers/faqController");
var router = express.Router();

router.post("/addNewFaq", addNewFaq);
router.get("/getAllFaqs", getAllFaqs);
// router.get("/getFaqById", getFaqById);

module.exports = router;