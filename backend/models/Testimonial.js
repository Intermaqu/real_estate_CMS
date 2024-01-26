const db = require("../db/config");

module.exports = {
  add: async (full_name, position, comment, created_at, active) => {
    let testimonial = await db.query(
      `INSERT INTO testimonial ("full_name", "position", "comment", "created_at", "active") VALUES ($1, $2, $3, $4, $5)`,
      [full_name, position, comment, created_at, active]
    );
    return testimonial;
  },

  getAll: async () => {
    let testimonials = await db.query("SELECT * FROM testimonial");
    return testimonials.rows
  },

  getById: async (req) => {
    let testimonial = await db.query(`SELECT * FROM testimonial WHERE "ID_TESTIMONIAL" = $1`, [
      req.body.id,
    ]);
    return testimonial.rows
  },
};
