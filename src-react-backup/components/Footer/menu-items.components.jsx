import React from "react";
import { Link } from "react-router-dom";

const MenuItems = () => {
  return (
    <div className="menu">
      <Link to="/projects">
        <div className="menuItem">Projects</div>
      </Link>
      <a
        href="https://drive.google.com/file/d/1UGPCZe3rQGR3mQF2RCt90SX5i1gMrVkA/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="menuItem">Resume</div>
      </a>
      <Link to="/about">
        <div className="menuItem">About me</div>
      </Link>
      <div className="menuItem footerEmail">Say Hi: aycarl@hotmail.com</div>
    </div>
  );
};

export default MenuItems;
