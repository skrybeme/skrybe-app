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

  const set = useCallback((isOpen?: boolean) => {
    setIsOpen((state) => isOpen !== undefined ? isOpen : !state);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return {
    close,
    isOpen,
    open,
    set,
    toggle
  };
}
