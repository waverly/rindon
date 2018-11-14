// EXAMPLE
import { css } from "styled-components";

export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

// layout

export const flexCenter = `
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const fixedFullSize = `
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const absFullSize = `
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const media = {
  handheld: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)};
    }
  `,
  landscape: (...args) => css`
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {
      ${css(...args)};
    }
  `,
  handheld_landscape: (...args) => css`
    @media (max-width: 768px),
      @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {
      ${css(...args)};
    }
  `
};

// end layout
