import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/pages/homepage.component";
import About from "./components/pages/about-me.component"

import Header from "./components/header/header.components"
import Footer from "./components/Footer/footer.component"

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
