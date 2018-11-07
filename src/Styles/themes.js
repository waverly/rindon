import { css } from "styled-components";

export const theme = {
  colors: { yellow: "#E9FF00", darkblue: "#1A1934" }, // layout
  z: {
    titleBar: 50,
    settingsMenu: 80,
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
  }, // end layout

  // type
  fontSize: {
    h1: "20px",
    h2: "14px",
    h3: "14px",
    p: "14px",
    h4: "14px",
    h5: "14px"
  },
  fontWeight: { light: "200", regular: "400", medium: "600", heavy: "800" },
  yellowBefore: css`
    content: "";
    width: 100%;
    height: 40%;
    position: absolute;
    background-color: ${props => props.theme.colors.yellow};
    top: 30%;
    left: 0;
    z-index: -1;
  `
};

// end type
