import React from "react";
import styled from "styled-components";

import BehanceLogo from "./../../assets/img/behance-logo.svg";
import LinkedInLogo from "./../../assets/img/linkedin-logo.svg";
import GitHubLogo from "./../../assets/img/github-logo.svg";

const SocialMediaLinksContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const SocialMediaIcon = styled.a``;

const SocialMediaLogo = styled.img`
  height: clamp(0.5rem, 1rem, 1.5rem);
`;

const SocialMediaLinks = () => {
  return (
    <SocialMediaLinksContainer>
      <SocialMediaIcon
        href="https://linkedin.com/in/aycarl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialMediaLogo alt="LinkedIn" src={LinkedInLogo} />
      </SocialMediaIcon>
      <SocialMediaIcon
        href="https://github.com/aycarl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialMediaLogo alt="GitHub" src={GitHubLogo} />
      </SocialMediaIcon>
      <SocialMediaIcon
        href="https://behance.net/aycarl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialMediaLogo alt="Behance" src={BehanceLogo} />
      </SocialMediaIcon>
    </SocialMediaLinksContainer>
  );
};

export default SocialMediaLinks;
