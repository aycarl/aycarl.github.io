import React from "react";
import styled from "styled-components";
import { H3, P } from "../../ui/fonts";

import Logo from "./../../assets/img/aycarl_color_bg-11.png";

const ProjectCardContainer = styled.div`
  display: flex;
  width: 100%;
  margin-block: 50px;
`;

const ProjectCardImage = styled.div`
  background-image: url("${Logo}");
  background-position: center;
  background-size: cover;
  width: 400px;
  height: 250px;
  border: 2px solid black;
  border-radius: 2px;
  box-shadow: 10px 10px #5dc4ff;
  margin-inline: 50px;
`;

const ProjectInformation = styled.div`
  width: max(600px, 100%);
  height: min(200px, 30vh);
  background-color: paleredviolet;
`;

const ProjectCard = (props) => {
  return (
    <ProjectCardContainer>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <ProjectCardImage />
      </a>
      <ProjectInformation>
        <H3>{props.projectName}</H3>
        <P>{props.description}</P>
        <P>{props.githubRepo}</P>
        <P>{props.website}</P>
      </ProjectInformation>
    </ProjectCardContainer>
  );
};

export default ProjectCard;
