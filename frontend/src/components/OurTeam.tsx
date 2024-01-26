import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import BrokerCard from "./BrokerCard";
import styled from "styled-components";

const OurTeam = () => {
  const [brokerBanners, setBrokerBanners] = useState([]);

  const init = () => {
    axios({
      method: "GET",
      url: `http://localhost:3001/broker-banner/getAllWithBrokerData`,
    })
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setBrokerBanners(data);
      })
      .catch((err: AxiosError) => {
        console.log(err?.response?.data);
      });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <OurTeamWrapper className="section-lg text-center bg-gray-100">
      <OurTeamBody>
        <OurTeamTitle>NASZ ZESPÓŁ</OurTeamTitle>
        <OurTeamGridWrapper>
          {brokerBanners.slice(0, 4).map((broker_banner) => (
            <BrokerCard
              brokerName={broker_banner.firstName + ' ' + broker_banner.firstSurname}
              brokerEmail={broker_banner.email}
              brokerPhone={broker_banner.phone_number}
              brokerDescription={broker_banner.comment}
            />
          ))}
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
