import React from "react";

import ProfilePicture from "./../../assets/img/aycarl_color_bg-11.png";

import "./jumbotron.styles.css";

const ImageContainer = () => (
  <div className="profileImageContainer">
    <img src="https://avatars1.githubusercontent.com/u/4999487?s=460&v=4" className="profileImage" />
  </div>
);

const JumboContent = () => {
  return (
    <div className="jumboProfileInfo">
        <h1>Carl Yao Agbenyega</h1>
        <h2>Web Developer, UI & Graphic Designer</h2>
    </div>
  );
};

const Jumbotron = () => {
  return (
    <div className="jumbotron section">
      <ImageContainer />
      <JumboContent />
    </div>
  );
};

export default Jumbotron;
