import React from "react";
import styled from "styled-components";

type BrokerCardProps = {
  brokerName: string;
  brokerPosition: string;
  brokerPhone: string;
  brokerDescription: string;
};

const BrokerCard = ({
  brokerName,
  brokerPosition,
  brokerPhone,
  brokerDescription,
}: BrokerCardProps) => {
  return (
    <BrokerWrapper>
      <BrokerBody>
        <BrokerImage src="images/team-1-270x273.jpg" alt="" />
        <BrokerData className="profile-creative-main">
          <BrokerName className="profile-creative-title">
            <a href="#">{brokerName}</a>
          </BrokerName>
          <BrokerPosition className="profile-creative-position">
            {brokerPosition}
          </BrokerPosition>
          <BrokerContacts className="profile-creative-contacts">
            <div className="object-inline">
              <span className="icon novi-icon icon-md mdi mdi-phone"></span>
              <BrokerPhone href="tel:#">{brokerPhone}</BrokerPhone>
            </div>
          </BrokerContacts>
          <BrokerDescription>{brokerDescription}</BrokerDescription>
        </BrokerData>
      </BrokerBody>
    </BrokerWrapper>
  );
};

const BrokerWrapper = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  overflow: hidden;
`;

const BrokerBody = styled.article`
  padding: 20px;
  padding-top: 0;
  display: flex;
  gap: 0.75rem;
  text-align: left;
  gap: 2rem;
  margin-top: 2rem;
`;

const BrokerImage = styled.img`
  width: 170px;
  object-fit: cover;
  height: 170px;
  border-radius: 6px;
`;

const BrokerData = styled.div``;

const BrokerName = styled.h5`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const BrokerPosition = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const BrokerContacts = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BrokerPhone = styled.a`
  font-size: 0.875rem;
  font-weight: 400;
`;

const BrokerDescription = styled.p`
  font-weight: 300;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

export default BrokerCard;
