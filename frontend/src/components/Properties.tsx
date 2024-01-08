import styled from "styled-components";
import PropertyCard from "./PropertyCard";

const Properties = () => {
  return (
    <PropertiesSection className="section">
      <PropertiesContainer>
        <PropertiesTitle>Popular properties</PropertiesTitle>
        <PropertiesGridWrapper>
          <PropertyCard
            title="5619 Walnut Hill Ln, Dallas, TX 75229"
            price="1500"
            size="30"
            bedrooms="3"
            description="A comfortable residential property located in a quiet and cozy area."
            imageSrc="images/grid-blog-1-571x353.jpg"
          />
          <PropertyCard
            title="1808 Bolingbroke Pl, Fort Worth, TX 76140"
            price="1300"
            size="40"
            bedrooms="2"
            description="Perfect for those who love both city life and the countryside."
            imageSrc="images/grid-blog-2-571x353.jpg"
          />
          <PropertyCard
            title="924 Bel Air Rd, Los Angeles, CA 90077"
            price="1800"
            size="50"
            bedrooms="4"
            description="Located in 5 mins from downtown, this property is great for anyone."
            imageSrc="images/grid-blog-3-571x353.jpg"
          />
          <PropertyCard
            title="13510 W Cheery Lynn Rd, Avondale, AZ 85392"
            price="2700"
            size="90"
            bedrooms="2"
            description="A luxury mansion for people who enjoy the high-end amenities."
            imageSrc="images/grid-blog-4-571x353.jpg"
          />

          <ViewMoreButtonWrapper>
            <ViewMoreButton>view More properties</ViewMoreButton>
          </ViewMoreButtonWrapper>
        </PropertiesGridWrapper>
      </PropertiesContainer>
    </PropertiesSection>
  );
};

const PropertiesSection = styled.section`
  margin-top: 25px;
  padding: 60px 0 70px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const PropertiesContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 1200px;
`;

const PropertiesTitle = styled.h3`
  font-weight: 700;
  text-transform: uppercase;
`;

const PropertiesGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  flex: 0 0 50%;
  margin-top: 2rem;
`;

const ViewMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  cursor: pointer;
`;

const ViewMoreButton = styled.a`
  color: #fff !important;
  background-color: #007bff;
  padding: 13px 35px 13px;
  border-radius: 6px;
  border: 2px solid rgb(0, 123, 255);
  letter-spacing: 1.4px;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    color: #fff;
    background-color: #232426;
    border-color: #232426;
  }
`;
export default Properties;
