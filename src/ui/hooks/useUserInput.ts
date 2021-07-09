import React from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import useEventListener from './useEventListener';

export interface UserInputHookOptions {
  container?: HTMLElement;
  delay?: number;
}

export interface UserInputHookResult {
  isActive: boolean;
}

export default function useUserInput(
  type: keyof GlobalEventHandlersEventMap,
  options?: UserInputHookOptions
): UserInputHookResult {
  const opts = React.useMemo(() => ({
    container: window,
    delay: 200,
    ...options
  }), [options]);

  const [isActive, setIsActive] = React.useState(false);

  const subject = React.useMemo(() => opts.container, [opts]);

  const timeout = React.useRef(0);

  const listener = React.useMemo(() => throttle(() => {
    if (!isActive) {
      setIsActive(true);
    }

    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      setIsActive(false);
    }, opts.delay / 2);
  }, opts.delay / 2), [isActive, timeout]);

  useEventListener({ listener, subject, type });

  return {
    isActive
  };
}
