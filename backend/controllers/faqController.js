const Faq = require("../models/Faq");

module.exports = {
  getAllFaqs: async (req, res) => {
    const allBanners = await Faq.getAllFaqs();
    res.status(200).send(allBanners);
  },

  addNewFaq: async (req, res) => {
    const body = req.body;
    if (
      !body.question || 
      !body.answer 
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
