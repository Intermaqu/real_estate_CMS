import React from "react";
import styled from "styled-components";

type Props = {
  icon: string;
  name: string;
  review: string;
  position: string;
};

const TestimonialCard = ({ icon, name, review, position }: Props) => {
  return (
    <Card>
      <CardBody>
        <IconAndNameWrapper>
          <IconWrapper>
            <Icon src={`/images/${icon}`} />
          </IconWrapper>
          <div>
            <Name>{name}</Name>
            <Position>{position}</Position>
          </div>
        </IconAndNameWrapper>
        <Reviwe>{review}</Reviwe>
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
  flex-direction: column;
  max-width: 350px;
  text-align: left;

  * {
    margin-left: 15px;
  }
`;

const IconAndNameWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid grey;
  overflow: hidden;
  border-radius: 50%;
`;

const Icon = styled.img`
  margin: 0;
  width: 3rem;
  height: 3rem;
`;

const Position = styled.p`
  margin-top: -1rem;
`;

const Name = styled.h4`
  margin-bottom: 1rem;
  margin-top: 0;
`;

const Reviwe = styled.p`
  text-align: left;
`;

export default TestimonialCard;
