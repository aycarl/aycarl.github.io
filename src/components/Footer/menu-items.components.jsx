import React from 'react'
import { Link } from 'react-router-dom'

const MenuItems = () => {
    return (
        <div className='menu'>
            <Link to="/about-me">
                <div className='menuItem'>About Me</div>
            </Link>
            <Link>
                <div className='menuItem'>Projects</div>
            </Link>
        </div>
    );
}

export default MenuItems;