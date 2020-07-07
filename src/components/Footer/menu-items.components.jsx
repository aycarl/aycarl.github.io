import React from "react";
import { Link } from "react-router-dom";

const MenuItems = () => {
  return (
    <div className="menu">
      <Link to="/projects">
        <div className="menuItem">Projects</div>
      </Link>
      <Link to="/">
        <div className="menuItem">Resume</div>
      </Link>
      <Link to="/about">
        <div className="menuItem">About me</div>
      </Link>
      <div className="menuItem footerEmail">
        Say Hi: aycarl@hotmail.com
      </div>
    </div>
  );
};

export default MenuItems;
