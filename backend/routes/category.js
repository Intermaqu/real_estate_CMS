var express = require("express");
const { route } = require(".");
const { addNewCategory } = require("../controllers/categoryController");
// const passport = require("passport");
const { getAllCategory, getCategoryById } = require("../models/Category");
var router = express.Router();

router.post("/addCategory", addNewCategory);

router.post("/getCategoryById", getCategoryById);

router.get("/getAllCategory", getAllCategory);

//passport.authenticate("jwt", { session: false }),
module.exports = router;