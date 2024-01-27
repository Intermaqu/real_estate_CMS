var express = require("express");
const passport = require("passport");
require("./../config/passport")(passport);

const { addNewBlogPost, getAllBlogPosts } = require("../controllers/blogPostController");
var router = express.Router();

router.post("/add", passport.authenticate("jwt", { session: false }), addNewBlogPost);
router.get("/getAll", getAllBlogPosts);

module.exports = router;