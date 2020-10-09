import { RefObject, useEffect, useRef } from "react";

export default function useDraggable(): RefObject<any> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current?.addEventListener('mousedown', () => {
      ref.current!.style.transform = `translateX(100px)`;
    });
  }, [ref]);

  return ref;
}
