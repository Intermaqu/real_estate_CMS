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
router.post("/add", addNewCategory);
// router.post("/edit/:id", editCategoryById);
router.delete("/delete/:id", deleteCategoryById);

module.exports = router;
