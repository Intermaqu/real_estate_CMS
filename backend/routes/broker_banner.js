var express = require("express");

const { addNewBrokerBanner, getAllBrokerBanners } = require("../controllers/brokerBannerController");
var router = express.Router();

router.post("/addNewBrokerBanner", addNewBrokerBanner);
router.get("/getAllBrokerBanners", getAllBrokerBanners);

module.exports = router;