import { css } from "styled-components";

export const borderCircle = () => css`
  border-radius: 50%;
`;

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

export const positionCoverBefore = () => css`
  position: relative;

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
