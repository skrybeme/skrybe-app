import { ModalResult } from '@/interfaces/hooks';
import { ReactNode, useCallback, useContext } from 'react';
import { ModalContext } from '@/ui/providers';

export default function useModal(component: ReactNode): ModalResult {
  const modal = useContext(ModalContext);

  const hide = useCallback(() => {
    modal.hide();
  }, [component]);

  const show = useCallback(() => {
    modal.show(component);
  }, [component]);

  return {
    hide,
    show
  };
}
