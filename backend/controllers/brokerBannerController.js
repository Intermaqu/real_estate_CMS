const BrokerBanner = require("../models/BrokerBanner");
const User = require("../models/User");

module.exports = {
  getAllBrokerBanners: async (req, res) => {
    const allBrokerBanners = await BrokerBanner.getAllBrokerBanners();
    res.status(200).send(allBrokerBanners);
  },

  getAllWithBrokerData: async (req, res) => {
    const allWithBrokerData = await BrokerBanner.getAllWithBrokerData();
    res.status(200).send(allWithBrokerData);
  },

  addNewBrokerBanner: async (req, res) => {
    const body = req.body;
    if (!body.id_broker || !body.comment || body.active === undefined) {
      res.status(400).send("Missing data");
      return 0;
    }

    let broker = await User.getUserById(body.id_broker);
    if (!broker) {
      res.status(400).send(`Nie znaleziono użytkownika o id ${body.id_broker}!`);
    }

    const real_estate = await BrokerBanner.addNewBrokerBanner(
      body.id_broker,
      body.comment,
      body.active
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("Broker banner added");
    } else {
      res.status(400).send("Error");
    }
  },
};
