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
    consultation_content
  ) => {
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
        consultation_content,
      ]
    );
    return companyInfo;
  },

  getAllCompanyInfo: async (req, res) => {
    let companyInfo = await db.query("SELECT * FROM company_info");
    res.status(200).send(companyInfo.rows);
  },

  getOne: async (req, res) => {
    let companyInfo = await db.query("SELECT * FROM company_info LIMIT 1");
    return companyInfo.rows[0];
  },

  editById: async (
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
    consultation_content,
    id
  ) => {
    let companyInfo = await db.query(
      `UPDATE company_info SET
        "id_address" = $1,
        "email" = $2,
        "phone_number_1" = $3,
        "phone_number_2" = $4,
        "about_us" = $5,
        "social_facebook_link" = $6,
        "social_twitter_link" = $7,
        "social_instagram_link" = $8,
        "social_google_link" = $9,
        "social_linked_in_link" = $10,
        "employees_content" = $11,
        "guaranteed_content" = $12,
        "consultation_content" = $13,
        WHERE "id" = $14`,
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
        consultation_content,
        id,
      ]
    );

    return companyInfo;
  },

  getCompanyInfoById: async (req, res) => {
    let companyInfo = await db.query(
      `SELECT * FROM company_info WHERE "ID_COMPANY_INFO" = $1`,
      [req.body.id]
    );
    res.status(200).send(companyInfo.rows[0]);
  },
};
