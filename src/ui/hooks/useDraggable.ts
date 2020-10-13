import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export default function useDraggable(): RefObject<any> {
  const ref = useRef<HTMLElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [dragStart, setDragStart] = useState<any>({ x: 0, y: 0 });

  const [current, setCurrent] = useState<any>({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setDragStart({ x: e.pageX, y: e.pageY });
    setIsDragging(true);
  };

  const onMouseMove = useCallback((e) => {
    if (!isDragging) {
      return;
    }

    const x = current.x + e.pageX - dragStart.x;
    const y = current.y + e.pageY - dragStart.y;
  
    ref.current!.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }, [ref, isDragging, dragStart, current]);

  const onMouseUp = useCallback((e) => {
    if (!isDragging) {
      return;
    }

    setCurrent({ x: current.x + e.pageX - dragStart.x, y: current.y + e.pageY - dragStart.y });
    setIsDragging(false);
    console.log("stop")
  }, [ref, isDragging, current, dragStart]);

  useEffect(() => {
    ref.current?.addEventListener('mousedown', onMouseDown);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      ref.current?.removeEventListener('mousedown', onMouseDown);

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [ref, isDragging, dragStart, current]);

  return ref;
}
