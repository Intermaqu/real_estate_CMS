const sectionActiveInfo = require("../models/sectionActiveInfo");

module.exports = {
  getAllSectionActiveInfo: async (req, res) => {
    const allSectionActiveInfo =
      await sectionActiveInfo.getAllSectionActiveInfo();
    res.status(200).send(allSectionActiveInfo);
  },

  addNewSectionActiveInfo: async (req, res) => {
    const body = req.body;
    if (
        body.banner_active === undefined ||
        body.best_seller_active === undefined ||
        body.static_content === undefined ||
        body.categories === undefined ||
        body.brokers === undefined ||
        body.blog === undefined ||
        body.testimonials === undefined
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
