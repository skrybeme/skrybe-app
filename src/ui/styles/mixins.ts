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

export const positionCover = () => css`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const positionCoverAfter = (distance = 0, distanceY = distance) => css`
  position: relative;

  &:after {
    bottom: ${distanceY}px;
    content: '';
    left: ${distance}px;
    position: absolute;
    right: ${distance}px;
    top: ${distanceY}px;
  }
`;

export const positionCoverBefore = (distance = 0, distanceY = distance) => css`
  position: relative;

  &:before {
    bottom: ${distanceY}px;
    content: '';
    left: ${distance}px;
    position: absolute;
    right: ${distance}px;
    top: ${distanceY}px;
  }
`;
