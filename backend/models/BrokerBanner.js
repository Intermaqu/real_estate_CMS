const db = require("../db/config");

module.exports = {
  addNewBrokerBanner: async (id_broker, comment, active) => {
    let brokerBanner = await db.query(
      `INSERT INTO banner ("id_broker", "comment", "active") VALUES ($1, $2, $3)`,
      [id_broker, comment, active]
    );
    return brokerBanner;
  },

  getAllBrokerBanners: async (req, res) => {
    let banners = await db.query("SELECT * FROM broker_banner");
    res.status(200).send(banners.rows);
  },

  getBrokerBannerById: async (req, res) => {
    let brokerBanner = await db.query(
      `SELECT * FROM broker_banner WHERE "ID_BROKER_BANNER" = $1`,
      [req.body.id]
    );
    res.status(200).send(brokerBanner.rows[0]);
  },
};
