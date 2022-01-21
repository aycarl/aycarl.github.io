import React from "react";
import styled from "styled-components";

import ProjectCard from "./project-card.components";

import { ProjectsList } from "./../../data/projects";

const ProjectCardContainer = styled.div`
  display: -ms-inline-grid;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const Projects = () => {
  return (
    <div className="section">
      <h3>Featured Projects</h3>
      <ProjectCardContainer>
        {ProjectsList.map((project, idx) => (
          <ProjectCard
            key={idx}
            projectName={project.name}
            description={project.description}
            link={project.website}
          />
        ))}
      </ProjectCardContainer>
    </div>
  );
};

export default Projects;
