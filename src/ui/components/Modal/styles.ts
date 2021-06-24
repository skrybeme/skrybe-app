import { ModalProps } from '@/interfaces/props';
import { positionCover, positionCoverBefore } from '@/ui/styles/mixins';
import styled from 'styled-components';

export const Modal = styled.div<Partial<ModalProps>>`
  ${positionCoverBefore()};
  ${positionCover()};

  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 1;

  &:before {
    background-color: ${props => props.theme.modal.backdrop};
    z-index: -1;
  }
`;

export const Window = styled.div`
  max-width: 768px;
`;
