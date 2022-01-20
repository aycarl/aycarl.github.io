import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SocialMediaLinks from "./social-media-links.components";
import NavMenu from "./nav-menu.components";

import LogoImage from "../../assets/img/aycarl-11.png";

const HeaderWrapper = styled.div`
  height: 75px;
  padding: 0.5vh 15vw;
  margin-bottom: 1rem;
  box-shadow: 0px 1px 4px #9e9e9e;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  height: 4em;
  width: 4em;
  border-radius: 2em;
  position: relative;
  display: block;
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
  top: auto;
  bottom: auto;
`;

const MenuSection = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            <Logo alt="logo" src={LogoImage} className="logo" />
          </Link>
        </LogoContainer>
        <MenuSection>
          <NavMenu />
          <SocialMediaLinks />
        </MenuSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
