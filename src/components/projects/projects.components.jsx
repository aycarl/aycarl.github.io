import React from "react";

import ProjectCard from "./project-card.components";

import "./projects.styles.css";

const Projects = () => {
  return (
    <div>
      <h3>Featured Projects (Web Development)</h3>
      <div className="projectContainer">
        <ProjectCard
          projectName="Beautique"
          description="An ecommerce website"
          link="http://beautique.herokuapp.com/"
        />
        <ProjectCard
          projectName="School Admin"
          description="A databse management app for k12 schools"
          link="https://paperhuts.com/school-admin/"
        />
        <ProjectCard
          projectName="Notices"
          description="A simple notice board app"
          link="https://aycarl.github.io/monsters-rolodex/"
        />
      </div>
    </div>
  );
};

export default Projects;
