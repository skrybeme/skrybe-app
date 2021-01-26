import styled, { css } from 'styled-components';

interface ModalProps {
  isVisible?: boolean;
}

export const Modal = styled.div<ModalProps>`
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition: all 0.1s ease-in-out;
  z-index: 1;

  ${props => props.isVisible && css`
    opacity: 1;
    pointer-events: all;
    transform: none;
  `};
`;
