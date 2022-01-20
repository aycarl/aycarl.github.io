import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  gap: 1em;
`;

const MenuItem = styled(Link)`
`;

const NavMenu = () => {
  return (
    <Menu>
      <MenuItem to="/about">
        <div className="menuItem">ABOUT ME</div>
      </MenuItem>
      <MenuItem to="/projects">
        <div className="menuItem">MY PROJECTS</div>
      </MenuItem>
      <a
        href="https://drive.google.com/file/d/1UGPCZe3rQGR3mQF2RCt90SX5i1gMrVkA/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="menuItem">MY RESUME</div>
      </a>
    </Menu>
  );
};

export default NavMenu;
