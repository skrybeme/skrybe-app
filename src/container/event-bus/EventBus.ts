import { UuidType } from '@/common/types';
import { generateUuid } from '@/helpers';

interface IEmitable {
  emit(message: IMessage): any;
}

interface ISubscribable {
  on(type: string, cb: Function): ISubscription;
  unsubscribeAll(): any;
}

interface ISubscription {
  unsubscribe(): any;
}

interface IMessage {}

type EventBusMessageType = string;

interface IEventBusMessage<T> extends IMessage {
  payload: T;
  type: EventBusMessageType;
}

interface ISubscriber {
  cb: Function;
  id: UuidType;
  type: string;
}

export default class EventBus implements IEmitable, ISubscribable {
  private static _instance: EventBus;
  protected _subscribers: Array<ISubscriber>;
  
  public constructor() {
    this._subscribers = [];
  }

  public static getInstance(): EventBus {
    if (!EventBus._instance) {
      EventBus._instance = new EventBus();
    }

    return EventBus._instance;
  }

  public emit<T>(message: IEventBusMessage<T>): void {
    this._subscribers.forEach(subscriber => {
      if (subscriber.type === message.type) {
        subscriber.cb.call(subscriber, message);
      }
    });
  }
  
  public on(type: string, cb: Function): ISubscription {
    const id = generateUuid();

    this._subscribers.push({ cb, id, type });

    return {
      unsubscribe: (): void => {
        this._subscribers = this._subscribers.filter(subscriber => subscriber.id !== id);
      }
    };
  }

  public unsubscribeAll(): void {
    this._subscribers = [];
  }
}
