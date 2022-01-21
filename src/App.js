import React from "react";
//import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/pages/homepage.component";
// import AboutPage from "./components/pages/about-me.component";
// import ProjectsPage from "./components/pages/projects.component";

import Header from "./components/header/header.components";
import Footer from "./components/Footer/footer.component";

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      {/* <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/projects' component={ProjectsPage} />
      </Switch> */}
      <Footer />
    </div>
  );
}

export default App;
