const db = require("../db/config");

module.exports = {
  addNewCompanyInfo: async (        
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
    consultation_content) => {
    let companyInfo = await db.query(
      `INSERT INTO company_info (
        "id_address",
        "email",
        "phone_number_1",
        "phone_number_2",
        "about_us",
        "social_facebook_link",
        "social_twitter_link",
        "social_instagram_link",
        "social_google_link",
        "social_linked_in_link",
        "employees_content",
        "guaranteed_content",
        "consultation_content
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
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
      ]
    );
    return companyInfo;
  },

  getAllCompanyInfo: async (req, res) => {
    let companyInfo = await db.query("SELECT * FROM company_info");
    res.status(200).send(companyInfo.rows);
  },

  getCompanyInfoById: async (req, res) => {
    let companyInfo = await db.query(
      `SELECT * FROM company_info WHERE "ID_COMPANY_INFO" = $1`,
      [req.body.id]
    );
    res.status(200).send(companyInfo.rows[0]);
  },
};
