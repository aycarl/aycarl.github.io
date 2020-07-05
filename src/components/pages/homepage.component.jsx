import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import WelcomeStatement from './welcome.components'
import Projects from '../projects/projects.components'

class Homepage extends Component {
    constructor(props){
        super();

        this.state = {
            'welcome': 'I love creating designs, products and service innovations. I am currently in school pursuing a masters in Information Systems and Assurance with a concentration in data analysis. I study software engineering and development tools in my spare time because I aspire to be a Front-end Developer with strong UI/UX design skills. I am a freelance Graphic Designer and recreational writer.'
        };
    }

    render(){
        return(
            <div>
                <WelcomeStatement welcome={this.state.welcome} />
                <Projects />
            </div>
        );
    }
}

export default Homepage;