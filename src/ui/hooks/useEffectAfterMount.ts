import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
} from 'react';

export default function useEffectAfterMount(cb: EffectCallback, deps?: DependencyList) {
  const isMounted = useRef(false);

  useEffect(() => {
      if (!isMounted.current) {
          isMounted.current = true;

          return;
      }

      cb();
  }, deps);
}
