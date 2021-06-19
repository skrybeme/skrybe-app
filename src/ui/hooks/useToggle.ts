import { ToggleResult } from '@/interfaces/hooks';
import { useCallback, useState } from 'react';

export default function useToggle(initialState: boolean = false): ToggleResult {
  const [isOpen, setIsOpen] = useState(initialState);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((state: boolean) => !state);
  }, []);

  return {
    close,
    isOpen,
    open,
    toggle
  };
}
