import React from "react";

import ProjectCard from "./project-card.components";

import "./projects.styles.css";

const Projects = () => {
  return (
    <div className="section">
      <h3>Featured Projects</h3>
      <div className="projectContainer">
        <ProjectCard
          projectName="Beautique"
          description="An ecommerce website"
          link="http://beautique.herokuapp.com/"
        />
        <ProjectCard
          projectName="School Admin"
          description="An admin app for k12 schools"
          link="https://paperhuts.com/school-admin/"
        />
        <ProjectCard
          projectName="Notices"
          description="A notice board app"
          link="https://aycarl.github.io/notices/"
        />
        <ProjectCard
          redirectCard
          projectName="User Interface & Graphic Design Projects"
          link="https://behance.net/aycarl"
        />
      </div>
    </div>
  );
};

export default Projects;
