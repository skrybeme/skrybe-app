import { ModalProps } from '@/interfaces/props';
import React from 'react';
import * as S from './styles';

export function Modal({ children, isVisible }: ModalProps): JSX.Element {
  return (
    <S.Modal isVisible={isVisible}>
      {children}
    </S.Modal>
  );
}