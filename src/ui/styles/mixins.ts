import { css } from "styled-components";

export const flex = () => css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const noSelect = () => css`
  -webkit-touch-callout: none;
  user-select: none;
`;

export const positionCover = () => css`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;
