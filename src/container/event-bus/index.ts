import EventBus from './EventBus';

export function createEventBus(): EventBus {
  return new EventBus();
}
