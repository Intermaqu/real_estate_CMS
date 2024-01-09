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
      <Properties />
      <Services />
      <Categories />
      <OurTeam />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Landing;
