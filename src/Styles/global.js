// @flow
/* eslint-disable */

import { css } from "styled-components";
import normalized from "./normalized";

import { fetchColor } from "Utils/prismic-configuration";

// const color = "#00DDFF";
export const globalStyles = css`
  ${normalized}

  ${"" /* TODO: CONVERT TO EOT */}
	@font-face {
    font-family: "Acumin Pro";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/acumin/Acumin-RPro.woff") format("woff");
  }

  @font-face {
    font-family: "Acumin Pro Bold";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/acumin/Acumin-BdPro.woff") format("woff");
  }

  html {
    font-size: 10px;
    font-family: "Acumin Pro", Helvetica, sans-serif;
    font-weight: 300;
  }

  form {
    margin: 0;
  }

  body {
    padding: 0;
    font-family: "Acumin Pro", Helvetica, sans-serif;
  }

  button,
  input,
  select,
  option,
  textarea {
    background: white;
    font-family: "Acumin Pro", Helvetica, sans-serif;
    font-weight: 300;
    border: none;
    outline: none;
    line-height: normal;
    padding: 0;
    border-radius: 0;
    color: #454545;
  }

  label {
    color: #454545;
  }

  button {
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  ol {
    font-weight: 300;
    margin: 0;
    letter-spacing: 1px;
    color: #1a1934;
  }

  h1 {
    font-size: 16px;
    line-height: 26px;
    @media screen and (max-width: 1000px) {
      font-size: 20px;
      line-height: 28px;
    }
  }

  h2,
  h3,
  h4,
  p,
  span,
  a {
    font-size: 1.4rem;
    line-height: 2rem;

    @media (max-width: 768px),
      @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {
      font-size: 1.6rem;
      line-height: 2.6rem;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  h3 {
    font-family: "Acumin Pro Bold", Helvetica, sans-serif;
  }

  #root,
  #reactRoot {
    height: 100%;
  }

  figure {
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  .fade-wait-leave {
    opacity: 1;
    background: black;
    transition: all 0.5s;
  }
  .fade-wait-leave.fade-wait-leave-active {
    opacity: 0;
    transition: all 0.4s ease-in;
  }

  .fade-wait-enter {
    opacity: 1;
  }

  .fade-wait-enter.fade-wait-enter-active {
    opacity: 1;
    background: black;
    /* Delay the enter animation until the leave completes */
    transition: opacity 0.4s ease-in 0.6s;
  }

  .fade-wait-height {
    background: black;
    transition: height 10s ease-in-out;
  }
`;
