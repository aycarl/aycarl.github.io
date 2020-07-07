import React, { Component } from "react";

import Projects from "./../projects/projects.components";

import "./page.styles.css";

class Homepage extends Component {

  render() {
    return (
      <div className="page">
        <Projects />
      </div>
    );
  }
}

export default Homepage;
