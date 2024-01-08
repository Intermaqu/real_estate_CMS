import "./bootstrap.css";
import "./style.css";
import "./fonts.css";
import Properties from "../components/Properties";
import Services from "../components/Services";
import Categories from "../components/Categories";
import OurTeam from "../components/OurTeam";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="page" style={{ maxWidth: "100%", overflowX: "hidden" }}>
      {/* <section
          className="section swiper-container swiper-slider swiper-slider-minimal"
          data-loop="true"
          data-slide-effect="fade"
          data-autoplay="4759"
          data-simulate-touch="true"
        >
          <div className="swiper-wrapper">
            <div
              className="swiper-slide swiper-slide_video"
              data-slide-bg="images/slider-minimal-slide-1-1920x968.jpg"
            >
              <div className="container">
                <div className="jumbotron-classic-content">
                  <div className="wow-outer">
                    <div className="title-docor-text font-weight-bold title-decorated text-uppercase wow slideInLeft text-white">
                      Offering Diverse
                    </div>
                  </div>
                  <h1 className="text-uppercase text-white font-weight-bold wow-outer">
                    <span className="wow slideInDown" data-wow-delay=".2s">
                      Properties
                    </span>
                  </h1>
                  <p className="text-white wow-outer">
                    <span className="wow slideInDown" data-wow-delay=".35s">
                      inHouse provides you with lots of great properties
                      throughout the USA so that you could easily choose your
                      dream property.
                    </span>
                  </p>
                  <div className="wow-outer button-outer">
                    <a
                      className="button button-md button-primary button-winona wow slideInDown"
                      href="#"
                      data-wow-delay=".4s"
                    >
                      View Properties
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              data-slide-bg="images/slider-minimal-slide-2-1920x968.jpg"
            >
              <div className="container">
                <div className="jumbotron-classic-content">
                  <div className="wow-outer">
                    <div className="title-docor-text font-weight-bold title-decorated text-uppercase wow slideInLeft text-white">
                      Easily
                    </div>
                  </div>
                  <h1 className="text-uppercase text-white font-weight-bold wow-outer">
                    <span className="wow slideInDown" data-wow-delay=".2s">
                      Rent & Sale
                    </span>
                  </h1>
                  <p className="text-white wow-outer">
                    <span className="wow slideInDown" data-wow-delay=".35s">
                      With the help of our services and property management
                      solutions, you can rent or sell any house or apartment.
                    </span>
                  </p>
                  <div className="wow-outer button-outer">
                    <a
                      className="button button-md button-primary button-winona wow slideInDown"
                      href="#"
                      data-wow-delay=".4s"
                    >
                      View properties
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              data-slide-bg="images/slider-minimal-slide-3-1920x968.jpg"
            >
              <div className="container">
                <div className="jumbotron-classic-content">
                  <div className="wow-outer">
                    <div className="title-docor-text font-weight-bold title-decorated text-uppercase wow slideInLeft text-white">
                      More Than 20 Years of
                    </div>
                  </div>
                  <h1 className="text-uppercase text-white font-weight-bold wow-outer">
                    <span className="wow slideInDown" data-wow-delay=".2s">
                      Experience
                    </span>
                  </h1>
                  <p className="text-white wow-outer">
                    <span className="wow slideInDown" data-wow-delay=".35s">
                      Founded in 1989, our company is a team of renowned
                      property management and real estate experts always ready
                      to help you.
                    </span>
                  </p>
                  <div className="wow-outer button-outer">
                    <a
                      className="button button-md button-primary button-winona wow slideInDown"
                      href="#"
                      data-wow-delay=".4s"
                    >
                      View properties
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-pagination-outer container">
            <div
              className="swiper-pagination swiper-pagination-modern swiper-pagination-marked"
              data-index-bullet="true"
            ></div>
          </div>
        </section> */}

      <Properties />
      <Services />
      <Categories />
      <OurTeam />
      <Testimonials />
      {/* <section className="section novi-background section-lg text-center">
        <div className="container">
          <h3 className="wow-outer">
            <span className="wow slideInDown text-uppercase">Testimonials</span>
          </h3>
          <div
            className="owl-carousel wow fadeIn"
            data-items="1"
            data-md-items="2"
            data-lg-items="3"
            data-dots="true"
            data-nav="false"
            data-loop="true"
            data-autoplay="true"
            data-autoplay-speed="731"
            data-autoplay-timeout="4268"
            data-margin="30"
            data-stage-padding="0"
            data-mouse-drag="false"
          >
            <blockquote className="quote-classic">
              <div className="quote-classic-meta">
                <div className="quote-classic-avatar">
                  <img
                    src="images/testimonials-person-6-96x96.jpg"
                    alt=""
                    width="96"
                    height="96"
                  />
                </div>
                <div className="quote-classic-info">
                  <cite className="quote-classic-cite">Albert Webb</cite>
                  <p className="quote-classic-caption">Regular Client</p>
                </div>
              </div>
              <div className="quote-classic-text">
                <p>
                  I have just bought an apartment in LA thanks to you and your
                  brokers. Everything went smooth and easy, the price was quite
                  affordable, and I’m sure I will use your services again in the
                  future.
                </p>
              </div>
            </blockquote>
            <blockquote className="quote-classic">
              <div className="quote-classic-meta">
                <div className="quote-classic-avatar">
                  <img
                    src="images/testimonials-person-1-96x96.jpg"
                    alt=""
                    width="96"
                    height="96"
                  />
                </div>
                <div className="quote-classic-info">
                  <cite className="quote-classic-cite">Kelly McMillan</cite>
                  <p className="quote-classic-caption">Regular Client</p>
                </div>
              </div>
              <div className="quote-classic-text">
                <p>
                  I have recently sold my rental property in Nelson via inHouse.
                  Everything about the sale was made seamless by your team. You
                  gave me great advice about what was necessary to expedite the
                  sale.
                </p>
              </div>
            </blockquote>
            <blockquote className="quote-classic">
              <div className="quote-classic-meta">
                <div className="quote-classic-avatar">
                  <img
                    src="images/testimonials-person-2-96x96.jpg"
                    alt=""
                    width="96"
                    height="96"
                  />
                </div>
                <div className="quote-classic-info">
                  <cite className="quote-classic-cite">Harold Barnett</cite>
                  <p className="quote-classic-caption">Regular Client</p>
                </div>
              </div>
              <div className="quote-classic-text">
                <p>
                  I really appreciate your time and expertise in helping me find
                  and buy my current home in Seattle, WA. Hope we can do
                  business again in the future and I will recommend you to
                  family and friends.
                </p>
              </div>
            </blockquote>
            <blockquote className="quote-classic">
              <div className="quote-classic-meta">
                <div className="quote-classic-avatar">
                  <img
                    src="images/testimonials-person-3-96x96.jpg"
                    alt=""
                    width="96"
                    height="96"
                  />
                </div>
                <div className="quote-classic-info">
                  <cite className="quote-classic-cite">Bill Warner</cite>
                  <p className="quote-classic-caption">Regular Client</p>
                </div>
              </div>
              <div className="quote-classic-text">
                <p>
                  I have just sold a property with inHouse and I can’t thank
                  them enough. Their team has great communication skills and
                  they have regularly communicated with me throughout the whole
                  process.
                </p>
              </div>
            </blockquote>
            <blockquote className="quote-classic">
              <div className="quote-classic-meta">
                <div className="quote-classic-avatar">
                  <img
                    src="images/testimonials-person-4-96x96.jpg"
                    alt=""
                    width="96"
                    height="96"
                  />
                </div>
                <div className="quote-classic-info">
                  <cite className="quote-classic-cite">Ann Lee</cite>
                  <p className="quote-classic-caption">Regular Client</p>
                </div>
              </div>
              <div className="quote-classic-text">
                <p>
                  Your skilled team helped me make the dream of selling my old
                  property a reality. The sale went smoothly, and I just closed
                  on an ideal new place I am excited to call home. Thank you for
                  your great services!
                </p>
              </div>
            </blockquote>
            <blockquote className="quote-classic">
              <div className="quote-classic-meta">
                <div className="quote-classic-avatar">
                  <img
                    src="images/testimonials-person-5-96x96.jpg"
                    alt=""
                    width="96"
                    height="96"
                  />
                </div>
                <div className="quote-classic-info">
                  <cite className="quote-classic-cite">Peter Clarkson</cite>
                  <p className="quote-classic-caption">Regular Client</p>
                </div>
              </div>
              <div className="quote-classic-text">
                <p>
                  I have to say that inHouse has the best brokers we've ever
                  worked with. Their professionalism, personality, attention to
                  detail, responsiveness and ability to close the deal are
                  outstanding!
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </section> */}
      {/* <footer className="section novi-background footer-advanced bg-gray-700">
        <div className="footer-advanced-main">
          <div className="container">
            <div className="row row-50">
              <div className="col-lg-4">
                <h5 className="font-weight-bold text-uppercase text-white">
                  About Us
                </h5>
                <p className="footer-advanced-text">
                  inHouse is the largest full-service real estate and property
                  management company. We offer expertise in the marketing and
                  sale of a wide range of properties, including residential real
                  estate, farms and lifestyle blocks, as well as commercial and
                  industrial properties that we hope may interest you.
                </p>
              </div>
              <div className="col-sm-7 col-md-5 col-lg-4">
                <h5 className="font-weight-bold text-uppercase text-white">
                  Recent Blog Posts
                </h5>
                <article className="post-inline">
                  <p className="post-inline-title">
                    <a href="#">
                      Real Estate Guide: 7 Important Tips for Buying a Home
                    </a>
                  </p>
                  <ul className="post-inline-meta">
                    <li>by Mike Barnes</li>
                    <li>
                      <a href="#">2 days ago</a>
                    </li>
                  </ul>
                </article>
                <article className="post-inline">
                  <p className="post-inline-title">
                    <a href="#">
                      Single-Family Homes as a Housing Option for Young Families
                    </a>
                  </p>
                  <ul className="post-inline-meta">
                    <li>by Mike Barnes</li>
                    <li>
                      <a href="#">2 days ago</a>
                    </li>
                  </ul>
                </article>
              </div>
              <div className="col-sm-5 col-md-7 col-lg-4">
                <h5 className="font-weight-bold text-uppercase text-white">
                  Gallery
                </h5>
                <div className="row row-x-10" data-lightgallery="group">
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-1.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-1-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-2.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-2-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-3.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-3-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-4.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-4-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-5.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-5-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-6.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-6-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"> </div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-7.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-7-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                  <div className="col-3 col-sm-4 col-md-3">
                    <a
                      className="thumbnail-minimal"
                      href="images/gallery-original-8.jpg"
                      data-lightgallery="item"
                    >
                      <img
                        className="thumbnail-minimal-image"
                        src="images/footer-gallery-8-85x85.jpg"
                        alt=""
                      />
                      <div className="thumbnail-minimal-caption"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-advanced-aside">
          <div className="container">
            <div className="footer-advanced-layout">
              <div>
                <ul className="list-nav">
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="about-us.html">About</a>
                  </li>
                  <li>
                    <a href="#">Properties</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="contacts.html">Contacts</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="foter-social-links list-inline list-inline-md">
                  <li>
                    <a
                      className="icon novi-icon icon-sm link-default mdi mdi-facebook"
                      href="#"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="icon novi-icon icon-sm link-default mdi mdi-twitter"
                      href="#"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="icon novi-icon icon-sm link-default mdi mdi-instagram"
                      href="#"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="icon novi-icon icon-sm link-default mdi mdi-google"
                      href="#"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="icon novi-icon icon-sm link-default mdi mdi-linkedin"
                      href="#"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <hr />
        </div>
        <div className="footer-advanced-aside">
          <div className="container">
            <div className="footer-advanced-layout">
              <a className="brand" href="index.html">
                <img
                  src="images/logo-light-115x34.png"
                  alt=""
                  width="115"
                  height="34"
                  srcSet="images/logo-light-115x34.png 2x"
                />
              </a>
              <p className="rights">
                <span>&copy;&nbsp;</span>
                <span className="copyright-year"></span>. All Rights Reserved.
                Design by{" "}
                <a href="https://www.templatemonster.com">TemplateMonster</a>
              </p>
            </div>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
};

export default Landing;
