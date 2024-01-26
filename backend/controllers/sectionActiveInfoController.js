const SectionActiveInfo = require("../models/sectionActiveInfo");

module.exports = {
  getAllSectionActiveInfo: async (req, res) => {
    const allSectionActiveInfo =
      await sectionActiveInfo.getAllSectionActiveInfo();
    res.status(200).send(allSectionActiveInfo);
  },

  addNewSectionActiveInfo: async (req, res) => {
    const {
      banner_active,
      best_seller_active,
      static_content,
      categories,
      brokers,
      blog,
      testimonials
    } = req.body;

    if (
        banner_active === undefined ||
        best_seller_active === undefined ||
        static_content === undefined ||
        categories === undefined ||
        brokers === undefined ||
        blog === undefined ||
        testimonials === undefined
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    const real_estate = await SectionActiveInfo.addNewSectionActiveInfo(
      banner_active,
      best_seller_active,
      static_content,
      categories,
      brokers,
      blog,
      testimonials
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("Section Active added");
    } else {
      res.status(400).send("Error");
    }
  },
};
