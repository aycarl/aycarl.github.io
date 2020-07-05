import React from 'react';

const WelcomeStatement = (props) => {
    return (
        <div>
            <p>{props.welcome}</p>
            <p><a href="./aboutMe">read more ...</a></p>
        </div>
    );
}

export default WelcomeStatement;