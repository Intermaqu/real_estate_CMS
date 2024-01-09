var express = require("express");

const { addNewBlogPost, getAllBlogPosts } = require("../controllers/blogPostController");
var router = express.Router();

router.post("/addNewBlogPost", addNewBlogPost);
router.get("/getAllBlogPosts", getAllBlogPosts);

module.exports = router;