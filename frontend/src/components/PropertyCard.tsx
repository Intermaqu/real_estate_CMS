import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type PropertyProps = {
  title: string;
  price: string;
  size: string;
  bedrooms: string;
  description: string;
  imageSrc: string;
  id: string;
};

// title = "5619 Walnut Hill Ln, Dallas, TX 75229";
// price = 1500;
// size = 30;
// bedrooms = 3;
// description = "A comfortable residential property located in a quiet and cozy area.";
// imageSrc = "images/grid-blog-1-571x353.jpg";

const PropertyCard = ({
  title,
  price,
  size,
  bedrooms,
  description,
  imageSrc,
  id,
}: PropertyProps) => {
  const navigate = useNavigate();

  return (
    <PropertyWrapper>
      <PropertyBody>
        <PropertyLink onClick={() => navigate(`/property?id=${id}`)}>
          <PropertyImage src={imageSrc} alt="" />
        </PropertyLink>
        <PropertyTitle>
          <a href="#">{title}</a>
        </PropertyTitle>
        <PropertyInfo>
          <li>
            <StyledPrice href="#">${price}/mon</StyledPrice>
          </li>
          <li>{size} Sq. Ft.</li>
          <li>{bedrooms} Bedrooms</li>
        </PropertyInfo>
        <PropertyDescription>{description}</PropertyDescription>
      </PropertyBody>
    </PropertyWrapper>
  );
};

const PropertyWrapper = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  overflow: hidden;
`;

const PropertyBody = styled.article`
  padding: 20px;
  padding-top: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
`;

const PropertyLink = styled.div`
  display: block;
  position: relative;
`;

const PropertyImage = styled.img`
  width: 100%;
`;

const PropertyTitle = styled.h4`
  a {
    color: #151515;
    text-decoration: none;
    font-weight: 400;
  }

  &:hover {
    color: #007bff;
  }
`;

const PropertyInfo = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;

  li {
    margin-right: 20px;
    color: #777;
    font-weight: 500;
    line-height: 24px;
  }
`;

const StyledPrice = styled.a`
  display: inline-block;
  color: #646cff;
  text-decoration: none;

  &:hover {
    color: #343db0;
  }
`;

const PropertyDescription = styled.p`
  color: #000;
  margin-top: 0;
`;

export default PropertyCard;
