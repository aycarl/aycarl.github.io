import React from "react";
import styled from "styled-components";
import { H1, H2, P } from "../../ui/fonts";

import ProfilePicture from "./../../assets/img/aycarl_color_bg-11.png";

const LandingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid black;
  border-radius: 2px;
  box-shadow: 10px 10px #5dc4ff;
  margin-right: 50px;
`;

const Image = styled.img`
  width: 100%;
`;

const Brief = styled.div`
  width: 650px;
`;

const Button = styled.button`
  align-items: center;
  height: 45px;
  border: 2px solid black;
  border-radius: 2px;
  box-shadow: 10px 10px #5dc4ff;
`;

const Landing = () => {
  return (
    <LandingContainer>
      <ImageContainer>
        <Image src={ProfilePicture} alt="Carl's Image" />
      </ImageContainer>
      <Brief>
        <P>Hi! My name is,</P>
        <H1>Carl Yao Agbenyega</H1>
        <H2>Software Engineer & Design Enthusiast</H2>
        <P>
          I am a full-stack engineer that enjoys creating intuitive
          user-experiences. I enjoy the process of brainstorming ideas, creating
          functional prototypes, architecting the needed resources (platforms,
          interfaces) to house the ideas and finally, bringing them to life with
          code.
        </P>
        <P>
          Currently, I am looking for opportunities to grow my knowledge and
          experience in developing scalable distributed systems using
          cloud-based infrastructure.
        </P>
        <Button>
          <p>Download my Resume</p>
        </Button>
      </Brief>
    </LandingContainer>
  );
};

export default Landing;
