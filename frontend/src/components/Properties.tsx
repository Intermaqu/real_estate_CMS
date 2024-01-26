import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import axios, { AxiosResponse, AxiosError } from "axios";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const init = () => {
    axios({
      method: "GET",
      url: `http://localhost:3001/real-estate`,
    })
      .then((res) => {
        console.log(res);
        const data = res.data;
        console.log(data);
        setProperties(data);
      })
      .catch((err: AxiosError) => {
        console.log(err?.response?.data);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <PropertiesSection className="section">
      <PropertiesContainer>
        <PropertiesTitle>POPULARNE OFERTY</PropertiesTitle>
        <PropertiesGridWrapper>
          {properties.slice(0,10).map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              price={property.price}
              size={property.square_footage}
              bedrooms={property.no_of_rooms}
              description={property.description}
              imageSrc="images/real-estate/apartament.jpg"
              id={property.id}
            />
          ))}
          <ViewMoreButtonWrapper>
            <ViewMoreButton>ZOBACZ WIĘCEJ OFERT</ViewMoreButton>
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
