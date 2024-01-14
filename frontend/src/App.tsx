import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PropertyPage from "./pages/PropertyPage";
import Page2 from "./pages/Page2";
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
          <Route path="/page2" element={<Page2 />} />
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
