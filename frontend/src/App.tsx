import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Page1 from "./pages/Page1";
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
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  padding: 0;
  margin: 0;
`;

export default App;
