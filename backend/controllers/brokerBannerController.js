const BrokerBanner = require("../models/BrokerBanner");

module.exports = {
  getAllBrokerBanners: async (req, res) => {
    const allBrokerBanners = await BrokerBanner.getAllBrokerBanners();
    res.status(200).send(allBrokerBanners);
  },

  addNewBrokerBanner: async (req, res) => {
    const body = req.body;
    if (
        !body.id_broker || 
        !body.comment || 
        !body.active
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
