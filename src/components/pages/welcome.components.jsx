import React from 'react'
import { Link } from 'react-router-dom'

const WelcomeStatement = (props) => {
    return (
        <div>
            <p>{props.welcome}</p>
            <p><Link to="/about">read more ...</Link></p>
        </div>
    );
}

export default WelcomeStatement