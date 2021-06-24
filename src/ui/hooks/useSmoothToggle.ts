import { SmoothToggleResult } from '@/interfaces/hooks';
import { useState, useEffect } from 'react';

export default function useSmoothToggle(
  isActive: boolean,
  delayInMs: number = 100
): SmoothToggleResult {
  const [isVisible, setIsVisible] = useState(isActive);

  const [shouldRender, setShouldRender] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);

      setTimeout(() => {
        setIsVisible(true);
      }, 0);
    } else {
      setIsVisible(false)

      setTimeout(() => {
        setShouldRender(false);
      }, delayInMs);
    }
  }, [delayInMs, isActive, setShouldRender, setIsVisible]);

  return {
    isVisible,
    shouldRender
  };
}
