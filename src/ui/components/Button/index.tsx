import { ButtonProps } from '@/interfaces/props';
import React from 'react';
import * as S from './styles';

export function Button({ children, muted, rounded }: ButtonProps): JSX.Element {
  return (
    <S.Button
      muted={muted || false}
      rounded={rounded || false}
    >
      {children}
    </S.Button>
  );
}
