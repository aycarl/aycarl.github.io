import React from "react";

import ProjectCard from "./project-card.components";

import "./projects.styles.css";

const Projects = (props) => {
  return (
    <div>
      <h3>Works & Projects</h3>
      <div className="projectContainer">
        <ProjectCard
          projectName="Monsters Rolodex"
          description="A simple rolodex for monsters"
          link="https://aycarl.github.io/monsters-rolodex/"
        />
        <ProjectCard
          projectName="Nana Darkoa"
          description="A personal brand"
          link="https://aycarl.github.io/monsters-rolodex/"
        />
        <ProjectCard
          projectName="Beautique"
          description="An ecommerce website"
          link="https://aycarl.github.io/monsters-rolodex/"
        />
      </div>
    </div>
  );
};

export default Projects;
