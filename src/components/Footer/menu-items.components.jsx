import React from "react";
import { Link } from "react-router-dom";

const MenuItems = () => {
  return (
    <div className="menu">
      <Link to="/about">
        <div className="menuItem">Projects</div>
      </Link>
      <Link>
        <div className="menuItem">Resume</div>
      </Link>
      <div className="menuItem footerEmail">
        Say Hi: aycarl@hotmail.com
      </div>
    </div>
  );
};

export default MenuItems;
