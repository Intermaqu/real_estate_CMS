import React from "react";
import styled from "styled-components";

type CategoryProps = {
  imageSrc: string;
  title: string;
};

const CategoryCard = ({ imageSrc, title }: CategoryProps) => {
  return (
    <CategoryWrapper>
      <CategoryBody>
        <CategoryLink>
          <CategoryImage src={imageSrc} />
        </CategoryLink>
        <CategoryTitle>
          <a href="#">{title}</a>
        </CategoryTitle>
      </CategoryBody>
    </CategoryWrapper>
  );
};

export default CategoryCard;

const CategoryWrapper = styled.div`
  flex: 1/4;
  max-width: 25%;
`;

const CategoryBody = styled.article`
  text-align: left;
`;

const CategoryLink = styled.a`
  display: block;
  position: relative;
  max-width: 270px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 100%;
`;

const CategoryTitle = styled.h4`
  a {
    color: #151515;
    text-decoration: none;
    font-weight: 500;
  }

  &:hover {
    color: #007bff;
  }
`;
