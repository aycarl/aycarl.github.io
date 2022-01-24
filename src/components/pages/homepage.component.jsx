import React, { Component } from "react";
import styled from "styled-components";

import Projects from "./../projects/projects.components";
import Landing from "../homepage/landing";

export const Page = styled.div`
  display: flex;
  align-items: center;
  padding-block: 10vh;
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
        <Page id="home-projects">
          <Projects />
        </Page>
      </div>
    );
  }
}

export default Homepage;
