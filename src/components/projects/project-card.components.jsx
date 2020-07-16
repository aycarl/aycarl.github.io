import React from "react";

import Logo from "./../../assets/img/aycarl_color_bg-11.png";

import "./project-card.style.css";

const ProjectCard = (props) => {
  return (
    <div className="projectCard">
      <a href={props.link}>
        <div style={{backgroundImage:`url(${Logo})`}} className="background-image" />
        <div className="projectDescription">
          <strong>{props.projectName}</strong>
          <p>{props.description}</p>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
