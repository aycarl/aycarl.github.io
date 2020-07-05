import React from 'react';
import Logo from '../../img/aycarl.png'

import './project-card.style.css'

const ProjectCard = (props) => {
    return (
        <div className="projectCard">
            <a href={props.link}>
                <div className="projectImage">
                    <img alt="project image" src={ Logo } className="background-image"/>
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