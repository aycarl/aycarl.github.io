import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  position: relative;
  max-height: 8vh;
  margin-bottom: 2vh;
  bottom: 0%;
  padding:  0.5vh 15vw;
  border-top: 1px black ridge;
`;

const EmailContainer = styled.div`
  margin-right: 0px;
  right: 0px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <EmailContainer>Say Hi: aycarl@hotmail.com</EmailContainer>
    </FooterContainer>
  );
};

export default Footer;
