const db = require("../db/config");

module.exports = {
  addNewSectionActiveInfo: async (
    banner_active,
    best_seller_active,
    static_content,
    categories,
    brokers,
    blog,
    testimonials
  ) => {

    let banner = await db.query(
      `INSERT INTO section_active_info (
        "banner_active",
        "best_seller_active",
        "static_content",
        "categories",
        "brokers",
        "blog",
        "testimonials"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        banner_active,
        best_seller_active,
        static_content,
        categories,
        brokers,
        blog,
        testimonials,
      ]
    );

    return banner;
  },

  getAllSectionActiveInfo: async (req, res) => {
    let sectionActiveInfo = await db.query("SELECT * FROM section_active_info");
    res.status(200).send(sectionActiveInfo.rows);
  },

  getSectionActiveInfoById: async (req, res) => {
    let sectionActiveInfo = await db.query(`SELECT * FROM section_active_info WHERE "ID_SECTION_ACTIVE_INFO" = $1`, [
      req.body.id,
    ]);
    res.status(200).send(sectionActiveInfo.rows[0]);
  },
};
