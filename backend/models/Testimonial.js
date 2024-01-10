const db = require("../db/config");

module.exports = {
  addNewTestimonial: async (full_name, position, comment, created_at, active) => {
    let testimonial = await db.query(
      `INSERT INTO testimonial ("full_name", "position", "comment", "created_at", "active") VALUES ($1, $2, $3, $4, $5)`,
      [full_name, position, comment, created_at, active]
    );
    return testimonial;
  },

  getAllTestimonials: async (req, res) => {
    let testimonials = await db.query("SELECT * FROM testimonial");
    res.status(200).send(testimonials.rows);
  },

  getTestimonialById: async (req, res) => {
    let testimonial = await db.query(`SELECT * FROM testimonial WHERE "ID_TESTIMONIAL" = $1`, [
      req.body.id,
    ]);
    res.status(200).send(testimonial.rows[0]);
  },
};
