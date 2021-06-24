import { ModalProps } from '@/interfaces/props';
import { useClickOutside } from '@/ui/hooks';
import { noop } from '@/utils';
import React from 'react';
import * as S from './styles';

export function Modal({
  children,
  isVisible,
  onClickOutside
}: ModalProps): React.ReactElement<ModalProps> {
  const modalWindowRef = React.useRef(null);

  useClickOutside(modalWindowRef, onClickOutside || noop);

  if (!isVisible) {
    return <></>;
  }

  return (
    <S.Modal>
      <S.Window ref={modalWindowRef}>
        {children}
      </S.Window>
    </S.Modal>
  );
}
