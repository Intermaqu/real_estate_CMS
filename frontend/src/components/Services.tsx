import React from "react";
import styled from "styled-components";
import ServiceCard from "./Service";

const Services = () => {
  return (
    <ServicesSection>
      <ServicesContainer>
        <ServicesRow>
          <ServiceCard
            icon="linearicons-home"
            title="Wide Range of Properties"
            description="We offer a wide range of residential and commercial properties for sale and rent throughout the USA."
          />
          <ServiceCard
            icon="linearicons-bubble-text"
            title="Free Consultations"
            description="Our acquaintance with a client always begins with a free consultation to find out what kind of property they are looking for."
          />
          <ServiceCard
            icon="linearicons-star"
            title="100% Guaranteed"
            description="All the results that you get from our realtors are 100% guaranteed to offer you the best choice of properties throughout the USA."
          />
        </ServicesRow>
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;

const ServicesSection = styled.section`
  margin-top: 25px;
  padding: 60px 0 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  background: #f3f4f6;
`;

const ServicesContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 1200px;
`;

const ServicesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  flex: 0 0 50%;
  margin-top: 2rem;
`;
