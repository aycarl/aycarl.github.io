import React, { Component } from "react";
import styled from "styled-components";

import Projects from "./../projects/projects.components";
import Skills from "./../skills/skills.component";
import Jumbotron from "../jumbotron/jumbotron.component";

import "./page.styles.css";

const Page = styled.div`
  padding: 0.5vh 15vw;
  min-height: 85vh;
`;

class Homepage extends Component {
  render() {
    return (
      <div>
        <Page>
          <Jumbotron />
        </Page>
        <Page>
          <Projects />
        </Page>
      </div>
    );
  }
}

export default Homepage;
