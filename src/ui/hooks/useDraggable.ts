import { IPoint } from '@/interfaces';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

// @TODO
// - Test this with RTL.
// - Add dragging limits.
export default function useDraggable<T extends HTMLElement = HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [dragStartPosition, setDragStartPosition] = useState<IPoint>({ x: 0, y: 0 });

  const [previousTranslation, setPreviousTranslation] = useState<IPoint>({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: MouseEvent) => {
    if (e.button !== 0) {
      return;
    }
  
    setDragStartPosition({ x: e.pageX, y: e.pageY });
    setIsDragging(true);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    const x = previousTranslation.x + e.pageX - dragStartPosition.x;
    const y = previousTranslation.y + e.pageY - dragStartPosition.y;
  
    ref.current!.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }, [ref, isDragging]);

  const onMouseUp = useCallback((e: MouseEvent) => {
    if (!isDragging || e.button !== 0) {
      return;
    }

    setPreviousTranslation({
      x: previousTranslation.x + e.pageX - dragStartPosition.x,
      y: previousTranslation.y + e.pageY - dragStartPosition.y
    });

    setIsDragging(false);
  }, [ref, isDragging]);

  useEffect(() => {
    ref.current?.addEventListener('mousedown', onMouseDown);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      ref.current?.removeEventListener('mousedown', onMouseDown);

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [ref, isDragging]);

  return ref;
}
