import { ButtonProps } from '@/interfaces/props';
import React from 'react';
import * as S from './styles';

export function Button({ children, muted, onClick, rounded }: ButtonProps): JSX.Element {
  return (
    // @ts-ignore
    <S.Button
      muted={muted || false}
      onClick={onClick}
      rounded={rounded || false}
    >
      {children}
    </S.Button>
  );
}
