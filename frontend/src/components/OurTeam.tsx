import React from "react";
import BrokerCard from "./BrokerCard";
import styled from "styled-components";

const OurTeam = () => {
  return (
    <OurTeamWrapper className="section-lg text-center bg-gray-100">
      <OurTeamBody>
        <OurTeamTitle>Our Team</OurTeamTitle>
        <OurTeamGridWrapper>
          <BrokerCard
            brokerName="Nathalie Porter"
            brokerPosition="Founder, Broker"
            brokerPhone="1-800-1324-567"
            brokerDescription="Ms. Porter founded our company in 1989 with a vision to help guests and residents of the USA to easily find and buy or rent real estate in all 50 states."
          />
          <BrokerCard
            brokerName="John Thompson"
            brokerPosition="Sales Associate"
            brokerPhone="1-800-1324-567"
            brokerDescription="John has been in sales and marketing for the past 15 years. He has excellent knowledge about the local market both residential and commercial."
          />
          <BrokerCard
            brokerName="Brian Payne"
            brokerPosition="Realtor"
            brokerPhone="1-800-1324-567"
            brokerDescription="Brian is not only a Licensed Realtor but also holds the Title Producers and Mortgage Licenses, which makes him a very knowledgeable real estate expert."
          />
          <BrokerCard
            brokerName="Marie Fernandez"
            brokerPosition="Broker"
            brokerPhone="1-800-1324-567"
            brokerDescription="Marie's goal is to provide clients with the highest level of marketing expertise and customer service to help them reach their uppermost real estate goals."
          />
        </OurTeamGridWrapper>
      </OurTeamBody>
    </OurTeamWrapper>
  );
};

const OurTeamWrapper = styled.section`
  margin: 0;
  padding: 0;
  margin-top: 25px;
  padding: 60px 0 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const OurTeamBody = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 1200px;
`;

const OurTeamTitle = styled.h3`
  font-weight: 400;
  text-transform: uppercase;
`;

const OurTeamGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  flex: 0 0 50%;
  margin-top: 2rem;
`;

export default OurTeam;
