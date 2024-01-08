import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <CategoriesSection>
      <CategoriesContainer>
        <CategoriesTitle>Residential property categories</CategoriesTitle>
        <CategoriesDescriptionWrapper>
          <CategoriesDescription>
            At our agency, we work with various types of residential real estate
            property. You can find out more about our properties by browsing our
            website.
          </CategoriesDescription>
        </CategoriesDescriptionWrapper>
        <CategoriesGridWrapper>
          <CategoryCard
            title="Single-Family Homes"
            imageSrc="images/service-thumbnail-1-270x300.jpg"
          />
          <CategoryCard
            title="Townhouses"
            imageSrc="images/service-thumbnail-2-270x300.jpg"
          />
          <CategoryCard
            title="Multi-Family Homes"
            imageSrc="images/service-thumbnail-3-270x300.jpg"
          />
          <CategoryCard
            title="Condominiums"
            imageSrc="images/service-thumbnail-4-270x300.jpg"
          />
        </CategoriesGridWrapper>
        <ViewMoreButtonWrapper>
          <ViewMoreButton>view More properties</ViewMoreButton>
        </ViewMoreButtonWrapper>
      </CategoriesContainer>
    </CategoriesSection>
  );
};

export default Categories;

const CategoriesSection = styled.section`
  margin-top: 25px;
  padding: 60px 0 70px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const CategoriesContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 1200px;
`;

const CategoriesTitle = styled.h3`
  font-weight: 400;
  text-transform: uppercase;
`;

const CategoriesDescriptionWrapper = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  self-align: center;
`;

const CategoriesDescription = styled.span`
  max-width: 720px;
  display: inline-block;
`;

const CategoriesGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 0 0 50%;
  justify-content: space-between;
  margin-top: 4rem;
`;

const ViewMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
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
