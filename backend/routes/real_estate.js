var express = require("express");
const {
  getAllRealEstateOffers,
  getRealEstateById,
  getRealEstateForDataInterfaceById,
  addNewRealEstate,
  editRealEstateById,
  deleteRealEstateById
} = require("../controllers/realEstateController");
var router = express.Router();

router.get("/", getAllRealEstateOffers);
router.get("/getById/:id", getRealEstateById);
router.get("/getForDataInterfaceById/:id", getRealEstateForDataInterfaceById);
router.post("/add", addNewRealEstate);
// router.post("/edit/:id", editRealEstateById);
router.delete('/delete/:id', deleteRealEstateById);

module.exports = router;
