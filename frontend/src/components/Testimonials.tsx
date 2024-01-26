import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import styled from "styled-components";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const init = () => {
    axios({
      method: "GET",
      url: `http://localhost:3001/testimonial`,
    })
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setTestimonials(data);
      })
      .catch((err: AxiosError) => {
        console.log(err?.response?.data);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <TestimonialsSection>
      <TestimonialsContainer>
        <TestimonialsTitle>OPINIE</TestimonialsTitle>
        <TestimonialsRow>
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              icon="testimonials-person-1-96x96.jpg"
              name={testimonial.full_name}
              position={testimonial.position}
              review={testimonial.comment}
            />
          ))}
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
