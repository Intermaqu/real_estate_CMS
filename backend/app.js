var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var addressRouter = require("./routes/address");
var realEstateImageRouter = require("./routes/real_estate_image");
var realEstateRouter = require("./routes/real_estate");
var blogPostRouter = require("./routes/blog_post");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/address", addressRouter);
app.use("/real-estate-image", realEstateImageRouter);
app.use("/real-estate", realEstateRouter);
app.use("/blog-post", blogPostRouter);

module.exports = app;