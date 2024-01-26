var express = require("express");

const {
  getAll,
  add,
  getById,
} = require("../controllers/testimonialController");
var router = express.Router();

router.get("/", getAll);
router.get("/getById", getById);
router.post("/add", add);

module.exports = router;
