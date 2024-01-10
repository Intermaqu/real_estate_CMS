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
        !body.banner_active ||
        !body.best_seller_active ||
        !body.static_content ||
        !body.categories ||
        !body.brokers ||
        !body.blog ||
        !body.testimonials
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
