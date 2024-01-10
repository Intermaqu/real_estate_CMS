var express = require("express");

const { addNewTestimonial, getAllTestimonials, getTestimonialById } = require("../controllers/testimonialController");
var router = express.Router();

router.post("/addNewTestimonial", addNewTestimonial);
router.get("/getAllTestimonials", getAllTestimonials);
// router.get("/getTestimonialById", getTestimonialById);

module.exports = router;