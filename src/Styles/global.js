// @flow
/* eslint-disable */

import { css } from "styled-components";
import normalized from "./normalized";

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
  p {
    font-size: 14px;
    line-height: 18px;

    @media screen and (max-width: 1000px) {
      font-size: 14px;
      line-height: 20px;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    font-family: "Acumin Pro", Helvetica, sans-serif;
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
    background: #e9ff00;
    transition: all 0.5s;
  }
  .fade-wait-leave.fade-wait-leave-active {
    opacity: 0;
    background: transparent;
    transition: all 0.4s ease-in;
  }

  .fade-wait-enter {
    opacity: 0;
    background: transparent;
  }
  .fade-wait-enter.fade-wait-enter-active {
    opacity: 1;
    background: #e9ff00;
    /* Delay the enter animation until the leave completes */
    transition: opacity 0.4s ease-in 0.6s;
  }

  .fade-wait-height {
    background: #e9ff00;
    transition: height 10s ease-in-out;
  }

  .example-enter {
    opacity: 1;
    background: blue;
    transition: all 2s;
  }

  .example-enter.example-enter-active {
    background-color: blue;
    opacity: 1;
    transition: all 2s ease-in;
  }

  .example-leave {
    background-color: red;
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 1;
    background-color: red;
    transition: all 2s ease-in;
  }

  .page-enter,
  .page-leave {
    position: absolute;
    -webkit-transition: transform 1s ease-in-out, opacity 1s ease-in-out;
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  }

  .page-enter {
    left: 100vw;
  }

  .page-enter.page-enter-active {
    -webkit-transform: translate3d(-100vw, 0, 0);
    transform: translate3d(-100vw, 0, 0);
  }

  .page-leave {
    left: 0;
  }

  .page-leave.page-leave-active {
    -webkit-transform: translate3d(-100vw, 0, 0);
    transform: translate3d(-100vw, 0, 0);
  }
`;
