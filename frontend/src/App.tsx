import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PropertyPage from "./pages/PropertyPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import styled from "styled-components";

const App = () => {
  return (
    <AppContainer>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/o-nas" element={<AboutUs />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export default App;
