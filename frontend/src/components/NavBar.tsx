import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <CustomNav>
      <CustomList>
        <CustomLink onClick={() => navigate("/")}>
          <CustomLinkText>STRONA GŁÓWNA</CustomLinkText>
        </CustomLink>
        <CustomLink onClick={() => navigate("/about-us")}>
          <CustomLinkText>O NAS</CustomLinkText>
        </CustomLink>
        <CustomLink onClick={() => navigate("/contact")}>
          <CustomLinkText>KONTAKT</CustomLinkText>
        </CustomLink>
        <CustomLink onClick={() => navigate("/login")}>
          <CustomLinkText>ZALOGUJ/ZAJERESTRUJ SIĘ</CustomLinkText>
        </CustomLink>
      </CustomList>
    </CustomNav>
  );
};

const CustomNav = styled.nav`
  width: 100%;
  padding-left: 3rem;
  background: rgba(51, 51, 51, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomList = styled.ul`
  display: flex;
  gap: 3.5rem;
  padding: 1rem 0;
  max-width: 1200px;
  width: 1200px;
`;

const CustomLink = styled.li`
  list-style: none;
`;

const CustomLinkText = styled.p`
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font: 400 14px/20px "Poppins", sans-serif;

  &:hover {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export default NavBar;
