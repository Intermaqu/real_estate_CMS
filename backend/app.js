const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const bannerRouter = require("./routes/banner");
const brokerBannerRouter = require("./routes/broker_banner");
const categoryRouter = require("./routes/category");
const realEstateImageRouter = require("./routes/real_estate_image");
const realEstateRouter = require("./routes/real_estate");
const blogPostRouter = require("./routes/blog_post");
const sectionActiveInfoRouter = require("./routes/section_active_info");
const testimonialRouter = require("./routes/testimonial");

const passport = require("passport");
require("./config/passport")(passport);

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use(
  "/address",
  // passport.authenticate("jwt", { session: false }),
  addressRouter
);
app.use(
  "/banner",
  // passport.authenticate("jwt", { session: false }),
  bannerRouter
);
app.use(
  "/broker-banner",
  brokerBannerRouter
);
app.use(
  "/category",
  categoryRouter
);
app.use(
  "/real-estate-image",
  //passport.authenticate("jwt", { session: false }),
  realEstateImageRouter
);
app.use("/real-estate", realEstateRouter);
app.use(
  "/blog-post",
  //passport.authenticate("jwt", { session: false }),
  blogPostRouter
);
app.use(
  "/section-active-info",
  //passport.authenticate("jwt", { session: false }),
  sectionActiveInfoRouter
);
app.use("/testimonial", testimonialRouter);

module.exports = app;
