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
    return testimonials.rows;
  },

  getById: async (id) => {
    console.log(id);

    let testimonial = await db.query(
      `SELECT * FROM testimonial WHERE "id" = $1`,
      [id]
    );
    console.log(testimonial.rows);

    return testimonial.rows;
  },

  editById: async (id, full_name, position, comment, active) => {
    let testimonial = await db.query(
      `UPDATE testimonial SET "full_name" = $2, "position" = $3, "comment" = $4, "active" = $6 WHERE "ID_TESTIMONIAL" = $1`,
      [id, full_name, position, comment, active]
    );
    return testimonial;
  },
};
