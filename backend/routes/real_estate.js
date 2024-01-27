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
router.post("/add", passport.authenticate("jwt", { session: false }), add);
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), editById);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), deleteById);

module.exports = router;
