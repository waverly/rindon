// @flow
/* eslint-disable */

import { css } from "styled-components";
import normalized from "./normalized";

export const globalStyles = css`
	${normalized}

		@font-face {
		font-family:'gotham';
		src: url('/fonts/gothamLightRegular.otf'); 
	}

	html {
		font-size: 10px;
		font-family: 'gotham', 'Times New Roman', Times, serif;
		font-weight: 300;
	}

	form {
		margin: 0;
	}

	button, input, select, option, textarea {
		background: white;
		font-family: 'gotham', 'Times New Roman', Times, serif;
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
		color: #454545;
	}

	label{
		color: #454545;
	}

	button {
		cursor: pointer;
	}

	h1, h2, h3, h4, h5, h6, p, li, ol {
		font-weight: 300;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #1A1934;


	}

	h1{
		font-size: 16px;
		line-height: 26px;
		@media screen and (max-width: 1000px) {
			font-size: 20px;
			line-height: 28px;
		}
		
	}

	h2, h3, h4, p {
		font-size: 12px;
		line-height: 18px;

		@media screen and (max-width: 1000px) {
			font-size: 14px;
			line-height: 20px;
		}
	}

	a {
		text-decoration: none;
		color: inherit;
		text-transform: uppercase;
	}

	* {
		box-sizing: border-box;
	}

	body {
		padding: 0;
		font-family: 'gotham', 'helvetica', sans-serif;
	}

	#root,
	#reactRoot {
		height: 100%;
	}

	figure {
		margin 0;
	}

	img {
		max-width: 100%;
	}


`;
