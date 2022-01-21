import React, { Component } from "react";
import styled from "styled-components";

import Projects from "./../projects/projects.components";
import Jumbotron from "../jumbotron/jumbotron.component";

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
