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
  
  edit: async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    if (
        !body.email ||
        !body.phone_number_1
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }
    
    const company_info = await CompanyInfo.editById(
      id_address,
      email,
      phone_number_1,
      phone_number_2,
      about_us,
      social_facebook_link,
      social_twitter_link,
      social_instagram_link,
      social_google_link,
      social_linked_in_link,
      employees_content,
      guaranteed_content,
      consultation_content
    ).catch((e) => {
      console.log(e);
    });

    if (company_info) {
      res.status(200).send("Company info edited");
    } else {
      res.status(400).send("Error");
    }
  },

  getOne: async (req, res) => {
    const companyInfo = await CompanyInfo.getOne();
    res.status(200).send(companyInfo);
  }
};
