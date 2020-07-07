import React from "react";

import Logo from "./../../assets/img/aycarl_color_bg-11.png";

import "./project-card.style.css";

const ProjectCard = (props) => {
  return (
    <div className="projectCard">
      <a href={props.link}>
        <div className="imgContainer">
          <img alt="project" src={Logo} className="background-image" />
        </div>
        <div className="projectDescription">
          <strong>{props.projectName}</strong>
          <p>{props.description}</p>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
