import { RefObject, useEffect } from 'react';

export default function useClickOutside(ref: RefObject<any>, cb: Function) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target)) {
        cb();
      }
    }

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  })
}
