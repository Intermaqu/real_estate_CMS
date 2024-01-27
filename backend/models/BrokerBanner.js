const db = require("../db/config");

module.exports = {
  getAllBrokerBanners: async () => {
    let banners = await db.query("SELECT * FROM broker_banner");
    return banners.rows;
  },

  getAllWithBrokerData: async () => {
    let banners = await db.query(
      'SELECT * FROM broker_banner LEFT JOIN "user" on broker_banner.id_broker = "user".id'
    );
    return banners.rows;
  },

  addNewBrokerBanner: async (id_broker, comment, active) => {
    let brokerBanner = await db.query(
      `INSERT INTO broker_banner ("id_broker", "comment", "active") VALUES ($1, $2, $3)`,
      [id_broker, comment, active]
    );
    return brokerBanner;
  },

  getBrokerBannerById: async (req, res) => {
    let brokerBanner = await db.query(
      `SELECT * FROM broker_banner WHERE "ID_BROKER_BANNER" = $1`,
      [req.body.id]
    );
    res.status(200).send(brokerBanner.rows[0]);
  },
};
