import { EventListenerHookProps } from '@/interfaces/hooks';
import React from 'react';

export default function useEventListener({
  listener,
  subject = window,
  type
}: EventListenerHookProps) {
  React.useEffect(() => {
    subject.addEventListener(type, listener);

    return () => {
      subject.removeEventListener(type, listener);
    };
  }, [listener, subject, type]);
}
