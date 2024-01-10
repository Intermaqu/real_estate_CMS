var express = require("express");

const { addNewBanner, getAllBanners, getBannerById } = require("../controllers/bannerController");
var router = express.Router();

router.post("/addNewBanner", addNewBanner);
router.get("/getAllBanners", getAllBanners);
// router.get("/getBannerById", getBannerById);

module.exports = router;