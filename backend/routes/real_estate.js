var express = require("express");
const {
  getAll,
  getById,
  getForDataInterfaceById,
  add,
  editById,
  deleteById,
} = require("../controllers/realEstateController");
var router = express.Router();

router.get("/", getAll);
router.get("/getById/:id", getById);
router.get("/getForDataInterfaceById/:id", getForDataInterfaceById);
router.post("/add", add);
router.post("/edit/:id", editById);
router.delete("/delete/:id", deleteById);

module.exports = router;
