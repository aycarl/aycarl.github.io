import React from "react";
import styled from "styled-components";

import ProfilePicture from "./../../assets/img/aycarl_color_bg-11.png";

const HeroContainer = styled.div`
  display: grid;
  justify-items: center;
  margin-block: 100px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  box-shadow: 10px 10px #5dc4ff;
  margin-block: 20px;
`;

const Image = styled.img`
  width: 100%;
`;

const About = () => {
  return (
    <HeroContainer>
      {/* <ImageContainer>
        <Image src="https://avatars1.githubusercontent.com/u/4999487?s=460&v=4" />
      </ImageContainer> */}
      <ImageContainer>
        <Image src={ProfilePicture} />
      </ImageContainer>
    </HeroContainer>
  );
};

export default About;
