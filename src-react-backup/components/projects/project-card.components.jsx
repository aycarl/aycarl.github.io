import React from "react";

import Logo from "./../../assets/img/aycarl_color_bg-11.png";

import "./project-card.style.css";

const ProjectCard = (props) => {
  return (
    <div className="projectCard">
      <a href={props.link} target="_blank">
        <div
          style={{ backgroundImage: `url(${Logo})` }}
          className={props.redirectCard ? "background-image redirectCard" : "background-image"}
        >
          <div className="projectDescription">
            <strong>{props.projectName}</strong>
            <p>{props.description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
