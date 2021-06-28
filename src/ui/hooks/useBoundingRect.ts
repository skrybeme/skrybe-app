import React from "react";
import { EventAware, Maybe } from "@/common/types";
import useEventListener from "./useEventListener";

export default function useBoundingRect<TElement extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<TElement>,
  containerRef: React.RefObject<EventAware> = { current: window }
): Maybe<DOMRect> {
  const [boundingRect, setBoundingRect] = React.useState<Maybe<DOMRect>>(undefined);

  const scrollListener = React.useCallback(() => {
    setBoundingRect(elementRef.current?.getBoundingClientRect());
  }, [elementRef]);

  useEventListener({
    listener: scrollListener,
    subject: containerRef.current || undefined,
    type: "scroll"
  });

  return boundingRect;
}
