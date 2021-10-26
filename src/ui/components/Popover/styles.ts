import styled, { css } from 'styled-components';

export const Body = styled.div<{ left?: boolean }>`
  background-color: ${props => props.theme.bgLight};
  min-width: 100%;
  left: ${props => props.left ? 0 : 'auto'};
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: ${props => props.left ? 'auto' : 0};
  transition: none;
`;

export const Popover = styled.div`
  &.is-open {
    ${Body} {
      opacity: 1;
      pointer-events: all;
      transition: all 0.05s ease-in-out;
    }
  }
`;
