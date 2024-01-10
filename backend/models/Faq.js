const db = require("../db/config");

module.exports = {
  addNewFaq: async (question, answer) => {
    let user = await db.query(
      `INSERT INTO users ("question", "answer) VALUES ($1, $2)`,
      [question, answer]
    );
    return user;
  },

  getAllFaqs: async (req, res) => {
    let faqs = await db.query("SELECT * FROM faq");
    res.status(200).send(faqs.rows);
  },

  getFaqById: async (req, res) => {
    let faq = await db.query(`SELECT * FROM faq WHERE "ID_FAQ" = $1`, [
      req.body.id,
    ]);
    res.status(200).send(faq.rows[0]);
  },
};
