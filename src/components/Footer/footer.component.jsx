import React from 'react';

import MenuItems from './menu-items.components'

import './footer.styles.css'

const Footer = () => {
    return (
        <div className='footer'>
            <hr />
            <MenuItems />
            <div className='footerEmail'><strong>Say Hi:</strong> aycarl@hotmail.com</div>
        </div>
    );
}

export default Footer;