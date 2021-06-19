import styled, { css } from 'styled-components';

export const Popover = styled.div<{ isOpen?: boolean }>`
  ${props => props.isOpen && css`
    ${Body} {
      opacity: 1;
      pointer-events: all;
      transition: all 0.05s ease-in-out;
    }
  `}
`;

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
