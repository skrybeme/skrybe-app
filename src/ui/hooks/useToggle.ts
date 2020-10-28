import { ToggleResult } from '@/interfaces/hooks';
import { useCallback, useState } from 'react';

export default function useToggle(): ToggleResult {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((state: boolean) => !state);
  }, []);

  return {
    close,
    isOpen,
    toggle
  };
}
