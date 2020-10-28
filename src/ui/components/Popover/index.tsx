import { PopoverProps } from '@/interfaces/props';
import { useClickOutside } from '@/ui/hooks';
import React, { useRef } from 'react';
import * as S from './styles';

export function Popover({ children, isOpen, onClickOutside }: PopoverProps): JSX.Element {
  const self = useRef<HTMLDivElement>(null);

  useClickOutside(self, () => {
    if (isOpen) {
      onClickOutside();
    }
  });

  return (
    <S.Popover
      isOpen={isOpen}
      ref={self}
    >
      <S.Body>
        {children}
      </S.Body>
    </S.Popover>
  );
}
