const BlogPost = require("../models/BlogPost");

module.exports = {
  getAllBlogPosts: async (req, res) => {
    const allBlogPosts = await BlogPost.getAllBlogPosts();
    res.status(200).send(allBlogPosts);
  },

  addNewBlogPost: async (req, res) => {
    const body = req.body;
    if (
      !body.owner ||
      !body.created_at ||
      !body.title ||
      !body.image ||
      !body.description ||
      !body.active
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
