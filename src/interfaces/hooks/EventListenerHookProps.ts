import { EventAware } from '@/common/types';

export default interface EventListenerHookProps {
  listener: EventListener;
  subject?: EventAware;
  type: keyof HTMLElementEventMap;
}
