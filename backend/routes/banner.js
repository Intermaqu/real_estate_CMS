var express = require("express");

const { addNewBanner, getAllBanners, getBannerById, editBannerById, deleteBannerById } = require("../controllers/bannerController");
var router = express.Router();

router.get("/", getAllBanners);
router.get("/getById/:id", getBannerById);
router.post("/add", addNewBanner);
router.post("/edit/:id", editBannerById);
router.delete('/delete/:id', deleteBannerById);


module.exports = router;