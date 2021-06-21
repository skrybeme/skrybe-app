import React from 'react';
import { ModalResult } from '@/interfaces/hooks';
import { ModalContext } from '@/ui/providers';

export default function useModal(): ModalResult {
  const modal = React.useContext(ModalContext);

  const close = React.useCallback(() => {
    modal.close();
  }, [modal.close]);

  const open = React.useCallback((component: React.ReactNode) => {
    modal.open(component);
  }, [modal.open]);

  return {
    close,
    open
  };
}
