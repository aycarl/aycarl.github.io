import React from "react";
import styled from "styled-components";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Landing = () => {
  return (
    <LandingContainer>
      <p>Hi! My name is,</p>
      <h1>Carl Yao Agbenyega</h1>
      <h1>I bring ideas to life with code.</h1>
    </LandingContainer>
  );
};

export default Landing;
