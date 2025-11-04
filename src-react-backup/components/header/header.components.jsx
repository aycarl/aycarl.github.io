import React from "react";

import { Link } from "react-router-dom";

import SocialMediaLinks from "./social-media-links.components";

import Logo from "../../assets/img/aycarl-11.png";

import "./header.styles.css";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="logoContainer">
          <Link to="/">
            <img alt="logo" src={Logo} className="logo" />
          </Link>
        </div>
        <SocialMediaLinks />
      </div>
    </div>
  );
};

export default Header;
