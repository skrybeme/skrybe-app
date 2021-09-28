import styled, { createGlobalStyle, css } from 'styled-components';
import { px, Space } from './spacing';

interface CenterProps {
  bgColor?: string;
  horizontal?: boolean;
  vertical?: boolean;
}

export const Center = styled.div<CenterProps>`${({ bgColor, horizontal, vertical }) => css`
  background-color: ${bgColor || 'transparent'};
  display: flex;
  height: 100%;

  ${horizontal && css`
    justify-content: center;
  `};

  ${vertical && css`
    align-items: center;
  `};
`}`;

export const CssReset = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul, button {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const SimpleLabel = styled.div`
  color: #999;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  margin-bottom: ${px(Space.M)};
  text-transform: uppercase;
`;

export const Unscrollable = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const Width = styled.div<{ width: number }>`${({ width }) => css`
  width: ${width}px;
`}`;
