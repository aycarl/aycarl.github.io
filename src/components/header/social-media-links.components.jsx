import React from 'react'

import './social-media-links.styles.css'

const SocialMediaLinks = (props) => {
    return (
        <div className='socialMediaLinks'>
            <div className='socialMediaIcon'>Twitter</div>
            <div className='socialMediaIcon'>LinkedIn</div>
            <div className='socialMediaIcon'>Medium</div>
            <div className='socialMediaIcon'>Behance</div>
        </div>
    );
}

export default SocialMediaLinks;