import styled from "styled-components";

export const fonts = {
  lato: "'Lato', sans-serif",
  notoSans: "'Noto Sans', sans-serif",
  roboto: "'Roboto', sans-serif",
};

export const H1 = styled.h1`
  font-family: ${fonts.roboto};
  font-style: normal;
  font-size: 55px;
  font-weight: 900;
  margin-block: 10px;
`;

export const H2 = styled.h2`
  font-family: ${fonts.roboto};
  font-style: normal;
  font-size: 35px;
  font-weight: 700;
  margin-block: 10px;
`;

export const H3 = styled.h3`
  font-family: ${fonts.roboto};
  font-style: normal;
  font-size: 24px;
  font-weight: 500;
  margin-block: 10px;
`;

export const P = styled.p`
  font-family: ${fonts.lato};
  font-style: normal;
  font-size: 18px;
  font-weight: 400;
  margin-block: 15px;
  line-height: 1.3;
  text-align: justify;
`;
