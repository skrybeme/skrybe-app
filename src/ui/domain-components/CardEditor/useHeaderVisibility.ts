import { EventAware } from '@/common/types';
import { useBoundingRect } from '@/ui/hooks';
import React from 'react';

export interface HeaderVisibilityHookResult {
  headerVisible: boolean;
}

export interface HeaderVisibilityHookOptions {
  containerRef?: React.RefObject<EventAware>,
  threshold: number;
}

export function useHeaderVisibility(
  ref: React.RefObject<HTMLElement>,
  options: HeaderVisibilityHookOptions = {
    containerRef: { current: window },
    threshold: 44
  }
): HeaderVisibilityHookResult {
  const rect = useBoundingRect(ref, options.containerRef);

  const [headerVisible, setHeaderVisible] = React.useState(true);

  React.useEffect(() => {
    if (rect?.bottom && rect?.bottom < options.threshold && headerVisible) {
      setHeaderVisible(false);
    } else if (rect?.bottom && rect?.bottom >= options.threshold && !headerVisible) {
      setHeaderVisible(true);
    }
  }, [rect])

  return { headerVisible };
}
