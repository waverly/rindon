import { css } from "styled-components";
import { media } from "Styles/style-utils";

export const theme = {
  colors: { yellow: "#E9FF00", darkblue: "#1A1934" },
  z: {
    nav: 50,
    navIcon: 80,
    overlay: 100,
    threeDot: 110,
    modal: 120,
    alert: 150
  },
  spacing: {
    eighth: "2px",
    quarter: "4px",
    half: "7px",
    single: "14px",
    double: "24px",
    triple: "36px",
    quadruple: "48px"
  },
  fontSize: {
    h1: "2rem",
    h2: "1.4rem",
    h3: "1.4rem",
    p: "1.4rem",
    h4: "1.4rem",
    h5: "1.4rem",
    mobileXl: "5rem",
    mobileL: "3.2rem",
    mobileP: "2rem"
  },
  lineHeight: {
    h1: "2.4rem",
    h2: "1.8rem",
    h3: "1.8rem",
    p: "1.8rem",
    h4: "1.8rem",
    h5: "1.8rem",
    mobileXl: "7rem",
    mobileL: "5rem",
    mobileP: "3rem"
  },
  blocks: {
    text: css`
      // type // layout // end layout
      width: 70vw;
      max-width: 800px;
    `
  },
  typeMixins: {
    p: css`
      font-size: ${props => props.theme.fontSize.p};
      line-height: ${props => props.theme.lineHeight.p};
      ${media.handheld_landscape`
        font-size: ${props => props.theme.fontSize.mobileP};
        line-height: ${props => props.theme.lineHeight.mobileP};
      `};
    `,
    h1: css`
      font-size: ${props => props.theme.fontSize.h1};
      line-height: ${props => props.theme.lineHeight.h1};
    `,
    h2: css`
      font-size: ${props => props.theme.fontSize.h2};
      line-height: ${props => props.theme.lineHeight.h2};
      font-weight: 600;
    `,
    h3: css`
      font-size: ${props => props.theme.fontSize.h3};
      line-height: ${props => props.theme.lineHeight.h3};
    `
  },
  fontWeight: { light: "200", regular: "400", medium: "600", heavy: "800" },
  yellowBefore: css`
    content: "";
    width: 100%;
    height: 40%;
    position: absolute;
    background-color: ${props => props.theme.keyColor};
    top: 30%;
    left: 0;
    z-index: -1;
  `
};

// end type
