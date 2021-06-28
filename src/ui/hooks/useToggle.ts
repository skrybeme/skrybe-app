import { ToggleResult } from '@/interfaces/hooks';
import { useCallback, useState } from 'react';

export default function useToggle(initialState = false): ToggleResult {
  const [isOpen, setIsOpen] = useState(initialState);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback((isOpen?: boolean) => {
    setIsOpen((state: boolean) => isOpen !== undefined ? isOpen : !state);
  }, []);

  return {
    close,
    isOpen,
    open,
    toggle
  };
}
