import React from "react";
//import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  gap: 2em;
`;

const MenuLink = styled.a``;

const NavMenu = () => {
  return (
    <Menu>
      <MenuLink href="#home-about">
        <p>About</p>
      </MenuLink>
      <MenuLink href="#home-projects">
        <p>Projects</p>
      </MenuLink>
      {/* <a
        href="https://drive.google.com/file/d/1UGPCZe3rQGR3mQF2RCt90SX5i1gMrVkA/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>RESUME</p>
      </a> */}
    </Menu>
  );
};

export default NavMenu;
