import React from "react";
import styled from "styled-components";
import TestimonialCard from "./Testimonial";

const Testimonials = () => {
  return (
    <TestimonialsSection>
      <TestimonialsContainer>
        <TestimonialsTitle>Testimonials</TestimonialsTitle>
        <TestimonialsRow>
          <TestimonialCard
            icon="testimonials-person-1-96x96.jpg"
            name="Albert Webb"
            position="Regular Client"
            review="I have just bought an apartment in LA thanks to you and your brokers. Everything went smooth and easy, the price was quite affordable, and I'm sure I will use your services again in the future."
          />
          <TestimonialCard
            icon="testimonials-person-1-96x96.jpg"
            name="Bill Warner"
            position="Regular Client"
            review="I have just sold a property with inHouse and I can't thank them enough. Their team has great communication skills and they have regularly communicated with me throughout the whole process."
          />
          <TestimonialCard
            icon="testimonials-person-1-96x96.jpg"
            name="Kelly McMillan"
            position="Regular Client"
            review="I have recently sold my rental property in Nelson via inHouse. Everything about the sale was made seamless by your team. You gave me great advice about what was necessary to expedite the sale."
          />
        </TestimonialsRow>
      </TestimonialsContainer>
    </TestimonialsSection>
  );
};

const TestimonialsSection = styled.section`
  margin-top: 25px;
  padding: 60px 0 70px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const TestimonialsContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width: 1200px;
`;

const TestimonialsTitle = styled.h3`
  font-weight: 400;
  text-transform: uppercase;
`;

const TestimonialsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  flex: 0 0 50%;
  margin-top: 2rem;
`;

export default Testimonials;
