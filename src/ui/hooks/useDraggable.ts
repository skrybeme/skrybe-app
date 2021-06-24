import { IPoint } from '@/interfaces';
import { RefObject, useEffect, useRef, useState } from 'react';
import useMouseDown from './useMouseDown';
import useMousePosition from './useMousePosition';

// @TODO
// - Test this with RTL.
// - Add dragging limits.
export default function useDraggable<
  T extends HTMLElement = HTMLElement
>(): RefObject<T> {
  const ref = useRef<T>(null);

  const [dragStartPosition, setDragStartPosition] = useState<IPoint>({ x: 0, y: 0 });

  const [previousTranslation, setPreviousTranslation] = useState<IPoint>({ x: 0, y: 0 });

  const position = useMousePosition();

  const isMouseDown = useMouseDown<T>(ref);

  useEffect(() => {
    if (isMouseDown) {
      setDragStartPosition({
        x: position.x,
        y: position.y
      });
    } else {
      setPreviousTranslation({
        x: previousTranslation.x + position.x - dragStartPosition.x,
        y: previousTranslation.y + position.y - dragStartPosition.y
      });
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (!isMouseDown) {
      return;
    }

    const translateX = previousTranslation.x + position.x - dragStartPosition.x;
    const translateY = previousTranslation.y + position.y - dragStartPosition.y;
  
    ref.current!.style.transform =
      `translateX(${translateX}px) translateY(${translateY}px)`;
  }, [position]);

  return ref;
}
