import React, { Component } from "react";
import styled from "styled-components";

import Projects from "./../projects/projects.components";
import About from "../homepage/about";
import Landing from "../homepage/landing";

export const Page = styled.div`
  padding-block: 15vh;
  padding-inline: 15vw;
  min-height: min(100vh, 1080px);
`;

class Homepage extends Component {
  render() {
    return (
      <div>
        <Page>
          <Landing />
        </Page>
        <Page id="home-about">
          <About />
        </Page>
        <Page id="home-projects">
          <Projects />
        </Page>
      </div>
    );
  }
}

export default Homepage;
