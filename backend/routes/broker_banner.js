var express = require("express");
const passport = require("passport");
require("./../config/passport")(passport);

const {
  addNewBrokerBanner,
  getAllBrokerBanners,
  getAllWithBrokerData,
} = require("../controllers/brokerBannerController");
var router = express.Router();

router.get("/", getAllBrokerBanners);
router.get("/getAllWithBrokerData", getAllWithBrokerData);
router.post("/add", passport.authenticate("jwt", { session: false }), addNewBrokerBanner);

module.exports = router;
