import React from 'react';
import { OverlayProps } from '@/interfaces/props';
import { useSmoothToggle } from '@/ui/hooks';
import * as S from './styles';

export function Overlay({ children, isActive }: OverlayProps): JSX.Element {
  const { isVisible, shouldRender } = useSmoothToggle(isActive);

  return (
    <React.Fragment>
      {shouldRender && (
        <S.Overlay isVisible={isVisible}>
          {children}
        </S.Overlay>
      )}
    </React.Fragment>
  );
}
