import React from "react";

// import ProfilePicture from "./../../assets/img/aycarl_color_bg-11.png";

import "./jumbotron.styles.css";

// const ImageContainer = () => (
//   <div className="profileImageContainer">
//     <img src={ProfilePicture} className="profileImage" />
//   </div>
// );

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
    <div className="jumbotron">
      {/* <ImageContainer /> */}
      <JumboContent />
    </div>
  );
};

export default Jumbotron;
