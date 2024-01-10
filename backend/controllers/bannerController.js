const Banner = require("../models/Banner");

module.exports = {
  getAllBanners: async (req, res) => {
    const allBanners = await Banner.getAllBanners();
    res.status(200).send(allBanners);
  },

  addNewBanner: async (req, res) => {
    const body = req.body;
    if (
      !body.title || 
      !body.subtitle || 
      !body.image || 
      !body.url || 
      !body.active
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
