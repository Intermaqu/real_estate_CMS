var express = require("express");
const { addNewCategory } = require("../controllers/categoryController");
const { getAllCategory, getCategoryById } = require("../models/Category");
var router = express.Router();

router.post("/addCategory", addNewCategory);

router.get("/getCategoryById", getCategoryById);

router.get("/getAllCategory", getAllCategory);

//passport.authenticate("jwt", { session: false }),
module.exports = router;