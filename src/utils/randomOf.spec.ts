import randomOf from './randomOf';

describe(`randomOf`, () => {
  // @TODO
  // Think about a testing method which will be independent of the function
  // implementation.
  const mathRandomMock = jest.spyOn(global.Math, 'random');

  afterEach(() => {
    mathRandomMock.mockRestore();
  });

  it(`returns random element from given array`, () => {
    const arr: Array<string> = ['a', 'b', 'c', 'd', 'e'];

    mathRandomMock.mockReturnValue(0);

    expect(randomOf<string>(arr)).toEqual('a');

    mathRandomMock.mockReturnValue(0.5);

    expect(randomOf<string>(arr)).toEqual('c');

    mathRandomMock.mockReturnValue(1);

    expect(randomOf<string>(arr)).toEqual('e');
  });
});
