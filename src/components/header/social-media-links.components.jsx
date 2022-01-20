import React from "react";
import styled from "styled-components";

const SocialMediaLinksContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const SocialMediaIcon = styled.a`
`;

const SocialMediaLinks = () => {
  return (
    <SocialMediaLinksContainer>
      <SocialMediaIcon
        href="https://linkedin.com/in/aycarl"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </SocialMediaIcon>
      <SocialMediaIcon
        href="https://github.com/@aycarl"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </SocialMediaIcon>
      <SocialMediaIcon
        href="https://behance.net/aycarl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Behance
      </SocialMediaIcon>
    </SocialMediaLinksContainer>
  );
};

export default SocialMediaLinks;
