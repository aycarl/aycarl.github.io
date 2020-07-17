import React, { Component } from "react";

import Projects from "./../projects/projects.components";
import Skills from "./../skills/skills.component";
import Jumbotron from "../jumbotron/jumbotron.component";

import "./page.styles.css";

class Homepage extends Component {

  render() {
    return (
      <div className="page">
        <Jumbotron />
        <Projects />
        <Skills />
      </div>
    );
  }
}

export default Homepage;
