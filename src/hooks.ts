import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<any>, cb: Function) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current.contains(e.target)) {
        cb();
      }
    }

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  })
}
