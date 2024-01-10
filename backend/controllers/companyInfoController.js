const CompanyInfo = require("../models/CompanyInfo");

module.exports = {
  getAllCompanyInfo: async (req, res) => {
    const companyInfo = await CompanyInfo.getAllCompanyInfo();
    res.status(200).send(companyInfo);
  },

  addNewCompanyInfo: async (req, res) => {
    const body = req.body;
    if (
        !body.id_address ||
        !body.email ||
        !body.phone_number_1 ||
        !body.phone_number_2 ||
        !body.about_us ||
        !body.social_facebook_link ||
        !body.social_twitter_link ||
        !body.social_instagram_link ||
        !body.social_google_link ||
        !body.social_linked_in_link ||
        !body.employees_content ||
        !body.guaranteed_content ||
        !body.consultation_content
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
