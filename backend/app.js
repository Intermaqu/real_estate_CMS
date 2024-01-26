const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const bannerRouter = require("./routes/banner");
const categoryRouter = require("./routes/category");
const realEstateImageRouter = require("./routes/real_estate_image");
const realEstateRouter = require("./routes/real_estate");
const blogPostRouter = require("./routes/blog_post");
const sectionActiveInfoRouter = require("./routes/section_active_info");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/address", addressRouter);
app.use("/banner", bannerRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/real-estate-image", realEstateImageRouter);
app.use("/real-estate", realEstateRouter);
app.use("/blog-post", blogPostRouter);
app.use("/section-active-info", sectionActiveInfoRouter);

module.exports = app;