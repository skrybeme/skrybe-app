import { ButtonProps } from '@/interfaces/props';
import React from 'react';
import * as S from './styles';

export function Button_VariantB({
  children,
  muted,
  onClick,
  rounded,
  variant,
  upper
}: ButtonProps): JSX.Element {
  return (
    <S.Button
      muted={muted || false}
      onClick={onClick}
      rounded={rounded || false}
      upper={upper || false}
      variant={variant}
    >
      {children}
    </S.Button>
  );
}
