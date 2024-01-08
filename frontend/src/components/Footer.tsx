import styled from "styled-components";

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer className="container">
        <FooterIconWrapper href="index.html">
          <FooterIcon
            src="images/logo-light-115x34.png"
            alt=""
            width="115"
            height="34"
            srcSet="images/logo-light-115x34.png 2x"
          />
        </FooterIconWrapper>
        <FooterRights className="rights">
          <span>&copy;&nbsp;</span>
          <span className="copyright-year"></span>. All Rights Reserved. Design
          by <a href="https://www.templatemonster.com">TemplateMonster</a>
        </FooterRights>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.section`
  width: 100%;
  background: #232426;
  color: #aeb1be;
  padding: 2rem 0 2rem;
  height: 8rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  height: 100%;
`;

const FooterIconWrapper = styled.a``;
const FooterIcon = styled.img``;
const FooterRights = styled.p`
  color: #74757f;
`;

export default Footer;
