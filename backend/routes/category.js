var express = require("express");
const {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  editCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryController");
var router = express.Router();

router.get("/", getAllCategories);
router.get("/get/:id", getCategoryById);
router.post("/add", passport.authenticate("jwt", { session: false }), addNewCategory);
// router.post("/edit/:id", passport.authenticate("jwt", { session: false }), editCategoryById);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), deleteCategoryById);

module.exports = router;
