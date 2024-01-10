const db = require("../db/config");

module.exports = {
  addNewBanner: async (title, subtitle, image, url, active) => {
    let banner = await db.query(
      `INSERT INTO banner ("title", "subtitle", "image", "url", "active") VALUES ($1, $2, $3, $4, $5)`,
      [title, subtitle, image, url, active]
    );
    return banner;
  },

  getAllBanners: async (req, res) => {
    let banners = await db.query("SELECT * FROM banner");
    res.status(200).send(banners.rows);
  },

  getBannerById: async (req, res) => {
    let banner = await db.query(
      `SELECT * FROM banner WHERE "ID_BANNER" = $1`,
      [req.body.id]
    );
    res.status(200).send(banner.rows[0]);
  },
};
