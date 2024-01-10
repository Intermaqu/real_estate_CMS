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
    let blogPost = await db.query(
      `INSERT INTO blog_post ("owner", "created_at", "title", "image", "description", "active") VALUES ($1, $2, $3, $4, $5, $6)`,
      [owner, created_at, title, image, description, active]
    );
    return blogPost;
  },

  getAllBlogPosts: async (req, res) => {
    let blogPosts = await db.query("SELECT * FROM blog_post");
    res.status(200).send(blogPosts.rows);
  },

  getBlogPostById: async (req, res) => {
    let blogPost = await db.query(
      `SELECT * FROM blog_post WHERE "ID_BLOG_POST" = $1`,
      [req.body.id]
    );
    res.status(200).send(blogPost.rows[0]);
  },
};
