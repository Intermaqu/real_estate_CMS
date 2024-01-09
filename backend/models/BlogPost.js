const db = require("../db/config");

module.exports = {
  addNewBlogPost: async (
    owner,
    created_at,
    title,
    image,
    description,
    active
  ) => {
    let user = await db.query(
      `INSERT INTO users ("owner", "created_at", "title", "image", "description", "active") VALUES ($1, $2, $3, $4, $5, $6)`,
      [owner, created_at, title, image, description, active]
    );
    return user;
  },

  getAllBlogPosts: async (req, res) => {
    let blogPosts = await db.query("SELECT * FROM blog_post");
    res.status(200).send(blogPosts.rows);
  },

  getBlogPostById: async (req, res) => {
    let blogPost = await db.query(
      `SELECT * FROM BlogPost WHERE "ID_BLOG_POST" = $1`,
      [req.body.id]
    );
    res.status(200).send(blogPost.rows[0]);
  },
};
