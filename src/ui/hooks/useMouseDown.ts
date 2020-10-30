import { useCallback, useEffect, useState } from 'react';

export default function useMouseDown<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>
): boolean {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseDownCallback = useCallback((e: MouseEvent) => {
    if (e.button !== 0) {
      return;
    }
  
    setIsMouseDown(true);
  }, []);

  const mouseUpCallback = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  useEffect(() => {
    ref.current?.addEventListener('mousedown', mouseDownCallback);
    window.addEventListener('mouseup', mouseUpCallback);
    window.addEventListener('blur', mouseUpCallback);

    return () => {
      ref.current?.removeEventListener('mousedown', mouseDownCallback);
      window.removeEventListener('mouseup', mouseUpCallback);
      window.removeEventListener('blur', mouseUpCallback);
    };
  }, []);

  return isMouseDown;
}
