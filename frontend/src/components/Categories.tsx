import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const init = () => {
    axios({
      method: "GET",
      url: `http://localhost:3001/category`,
    })
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setCategories(data);
        
      })
      .catch((err: AxiosError) => {
        console.log(err?.response?.data);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <CategoriesSection>
      <CategoriesContainer>
        <CategoriesTitle>Kategorie nieruchomości mieszkalnych</CategoriesTitle>
        <CategoriesDescriptionWrapper>
          <CategoriesDescription>
            W naszym biurze współpracujemy z różnymi rodzajami nieruchomości
            mieszkalnych. Więcej informacji na temat naszych nieruchomości
            znajdziesz, przeglądając naszą stronę internetową.
          </CategoriesDescription>
        </CategoriesDescriptionWrapper>
        <CategoriesGridWrapper>
          {categories.slice(0, 4).map((category) => (
            <CategoryCard
              title={category.name}
              imageSrc={`images/category/${category.image}`}
            />
          ))}
        </CategoriesGridWrapper>
        <ViewMoreButtonWrapper>
          <ViewMoreButton>ZOBACZ WIĘCEJ KATEGORII</ViewMoreButton>
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
