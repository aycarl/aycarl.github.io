import React from "react";

import "./social-media-links.styles.css";

const SocialMediaLinks = (props) => {
  return (
    <div className="socialMediaLinks">
      <div className="socialMediaIcon">
        <a
          href="https://twitter.com/_aycarl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
      <div className="socialMediaIcon">
        <a
          href="https://linkedin.com/in/aycarl"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className="socialMediaIcon">
        <a
          href="https://medium.com/@aycarl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
      </div>
      <div className="socialMediaIcon">
        <a
          href="https://behance.net/aycarl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Behance
        </a>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
