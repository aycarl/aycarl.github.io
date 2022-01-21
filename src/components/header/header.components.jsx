import React from "react";
import styled from "styled-components";

import SocialMediaLinks from "./social-media-links.components";
import NavMenu from "./nav-menu.components";

import LogoImage from "../../assets/img/aycarl-11.png";

const HeaderWrapper = styled.div`
  height: 75px;
  width: 100%;
  padding: 0.5vh 15vw;
  margin-bottom: 1rem;
  box-shadow: 0px 1px 4px #9e9e9e;
  z-index: 1;
  position: fixed;
  background-color: #f3f3f3;
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
  gap: 2em;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <a href="/">
            <Logo alt="logo" src={LogoImage} className="logo" />
          </a>
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
