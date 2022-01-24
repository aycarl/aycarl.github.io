import React from "react";
import styled from "styled-components";

import ProjectCard from "./project-card.components";

import { ProjectsList } from "./../../data/projects";
import { H2 } from "../../ui/fonts";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProjectCardContainer = styled.div`
  display: -ms-inline-grid;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px;
  width: min(1200px, 100%);
`;

// const ProjectCardContainer = styled.div`
//   display: -ms-inline-grid;
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   grid-gap: 20px;
// `;

const Projects = () => {
  return (
    <ProjectContainer>
      <H2>My Noteworthy Projects</H2>
      <ProjectCardContainer>
        {ProjectsList.map((project, idx) => (
          <ProjectCard
            key={idx}
            projectName={project.name}
            description={project.description}
            link={project.website}
            {...project}
          />
        ))}
      </ProjectCardContainer>
    </ProjectContainer>
  );
};

export default Projects;
