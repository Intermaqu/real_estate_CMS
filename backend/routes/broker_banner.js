var express = require("express");

const {
  addNewBrokerBanner,
  getAllBrokerBanners,
  getAllWithBrokerData,
} = require("../controllers/brokerBannerController");
var router = express.Router();

router.get("/", getAllBrokerBanners);
router.get("/getAllWithBrokerData", getAllWithBrokerData);
router.post("/add", addNewBrokerBanner);

module.exports = router;
