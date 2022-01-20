import React from "react";
import styled from "styled-components";

import ProfilePicture from "./../../assets/img/aycarl_color_bg-11.png";

const HeroContainer = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  margin-block: 100px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  box-shadow: 10px 10px #5dc4ff;
`;

const Image = styled.img`
  width: 100%;
`;

const Jumbotron = () => {
  return (
    <HeroContainer>
      <ImageContainer>
        <Image src="https://avatars1.githubusercontent.com/u/4999487?s=460&v=4" />
      </ImageContainer>
      <h1>Hi! I'm Carl,</h1>
      <p>a software engineer with a passion for design</p>
      <p>I enjoy the process of bringing ideas to life!</p>
    </HeroContainer>
  );
};

export default Jumbotron;
