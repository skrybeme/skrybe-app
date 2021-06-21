import { IPoint } from '@/interfaces';
import { MousePositionResult } from '@/interfaces/hooks';
import { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export default function useMousePosition(): MousePositionResult {
  const [position, setPosition] = useState<IPoint>({ x: 0, y: 0 });

  const mouseMoveCallback = useCallback(throttle((e: MouseEvent) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    });
  }, 20), []);

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveCallback);

    return () => {
      window.removeEventListener('mousemove', mouseMoveCallback);
    };
  }, []);

  return position;
}
