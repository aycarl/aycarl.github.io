import React from "react";
import styled from "styled-components";

import Logo from "./../../assets/img/aycarl_color_bg-11.png";

const ProjectCardContainer = styled.div`
  width: min(475px; 90vw);
  display: inline-block;
  position: relative;
  border: 1px solid;
  box-shadow: 10px 10px #dcf2ff;
`;

const ProjectCardImage = styled.div`
  background-image: url("${Logo}");
  filter: grayscale(50%);
  position: relative;
  height: 200px;
  width: 100%;
  background-position: center;
  background-size: cover;
`;

const ProjectNameSlot = styled.div`
  background-color: #f3f3f3;
  height: 50px;
  padding-inline: 10px;
  padding-block: 10px;
`;

const ProjectCard = (props) => {
  return (
    <ProjectCardContainer>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <ProjectCardImage />
        <ProjectNameSlot>
          <p>{props.projectName}</p>
        </ProjectNameSlot>
      </a>
    </ProjectCardContainer>
  );
};

export default ProjectCard;
