import React, { Component } from "react"

class HomePage extends Component{
  state = {
    welcome: "Hello World"
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