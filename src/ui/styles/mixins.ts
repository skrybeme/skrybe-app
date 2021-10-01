import { css } from "styled-components";

export const borderCircle = () => css`
  border-radius: 50%;
`;

export const borderRadius = (radius = 3) => css`
  border-radius: ${radius}px;
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

export const positionCover = (distance = 0) => css`
  bottom: ${distance}px;
  left: ${distance}px;
  position: absolute;
  right: ${distance}px;
  top: ${distance}px;
`;

export const positionCoverBefore = (distance = 0) => css`
  position: relative;

  &:before {
    bottom: ${distance}px;
    content: '';
    left: ${distance}px;
    position: absolute;
    right: ${distance}px;
    top: ${distance}px;
  }
`;
