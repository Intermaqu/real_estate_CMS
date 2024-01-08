import React from "react";
import styled from "styled-components";

type Props = {
  icon: string;
  title: string;
  description: string;
};

const ServiceCard = ({ icon, title, description }: Props) => {
  return (
    <Card>
      <CardBody>
        <IconWrapper>
          <Icon src={`/images/${icon}`} />
        </IconWrapper>
        <div>
          <Title>{title}</Title>
          <Description className="wow fadeInUpSmall">{description}</Description>
        </div>
      </CardBody>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const CardBody = styled.article`
  display: flex;
  flex-direction: row;
  text-align: left;

  * {
    margin-left: 15px;
  }
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  border: 1px solid grey;
`;

const Icon = styled.img`
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h4`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const Description = styled.p`
  text-align: left;
`;

export default ServiceCard;
