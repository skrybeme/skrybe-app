import styled, { css } from 'styled-components';

export const Popover = styled.div<{ isOpen?: boolean }>`
  ${props => props.isOpen && css`
    ${Body} {
      opacity: 1;
      pointer-events: all;
      transform: none;
    }
  `}
`;

export const Body = styled.div<{ left?: boolean }>`
  background-color: ${props => props.theme.bgLight};
  box-shadow: 1px 1px 3px ${props => props.theme.shadow};
  min-width: 100%;
  left: ${props => props.left ? 0 : 'auto'};
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: ${props => props.left ? 'auto' : 0};
  transform: scale(0.9);
  transition: all 0.1s ease-in-out;
`;
