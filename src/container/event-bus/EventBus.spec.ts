import EventBus from './EventBus';

describe(`EventBus`, () => {
  const eventBus = EventBus.getInstance();
  const mockedCallback = jest.fn();

  afterEach(() => {
    mockedCallback.mockClear();
  });

  it(`emits messages to subscribers listening to specific message type`, () => {
    eventBus.on('message', mockedCallback);
    eventBus.emit<number>({ type: 'message', payload: 1 });

    expect(mockedCallback).toBeCalledTimes(1);
  });

  it(`does not emit messages to subscribers listening to different message type`, () => {
    eventBus.emit<number>({ type: 'other-message', payload: 1 });

    expect(mockedCallback).toBeCalledTimes(0);
  });

  it(`allows to unsubscribe from specific message type`, () => {
    const { unsubscribe } = eventBus.on('yet-another-message', mockedCallback);

    unsubscribe();

    eventBus.emit<number>({ type: 'yet-another-message', payload: 1 });

    expect(mockedCallback).toBeCalledTimes(0);
  });

  it(`allows to unsubscribe all subscribers`, () => {
    eventBus.on('another-message', mockedCallback);

    eventBus.unsubscribeAll();

    eventBus.emit<number>({ type: 'another-message', payload: 1 });
    eventBus.emit<number>({ type: 'message', payload: 1 });

    expect(mockedCallback).toBeCalledTimes(0);
  });
});
