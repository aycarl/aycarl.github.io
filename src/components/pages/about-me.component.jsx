import React from "react";

import "./page.styles.css";

const AboutMe = () => {
  const about =
    "I love creating designs, products and service innovations. I am currently in school pursuing a masters in Information Systems and Assurance with a concentration in data analysis. I study software engineering and development tools in my spare time because I aspire to be a Front-end Developer with strong UI/UX design skills. I am a freelance Graphic Designer and recreational writer.";

  return (
    <div className="page">
      <h1>About me</h1>
      <p>{about}</p>
    </div>
  );
};

export default AboutMe;
