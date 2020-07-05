import React, { Component } from "react"

class HomePage extends Component{
  state = {
    welcome: "I love creating designs, products and service innovations. I am currently in school pursuing a masters in Information Systems and Assurance with a concentration in data analysis. I study software engineering and development tools in my spare time because I aspire to be a Front-end Developer with strong UI/UX design skills. I am a freelance Graphic Designer and recreational writer."
  }

  render(){
    return(
      <div>
        <h1>Carl Yao Agbenyega</h1>
        <p>{this.state.welcome}</p>
      </div>
    )
  }
}

export default HomePage