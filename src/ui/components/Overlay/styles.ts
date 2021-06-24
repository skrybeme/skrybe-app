import { positionCover, positionCoverBefore } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';

export interface OverlayProps {
  isVisible?: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  ${positionCover()};
  ${positionCoverBefore()};

  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  position: fixed;
  z-index: 1000;

  &:before {
    background: rgba(0, 0, 0);
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
  }

  ${props => props.isVisible && css`
    pointer-events: all;

    &:before {
      opacity: 0.3;
    }
  `}
`;
