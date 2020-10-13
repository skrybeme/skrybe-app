import randomInt from './randomInt';

describe(`randomInt`, () => {
  // @TODO
  // Think about a testing method which will be independent of the function
  // implementation.
  const mathRandomMock = jest.spyOn(global.Math, 'random');

  afterEach(() => {
    mathRandomMock.mockRestore();
  });

  it(`generates random number from given range`, () => {
    mathRandomMock.mockReturnValue(0);

    expect(randomInt(1, 10)).toEqual(1);

    mathRandomMock.mockReturnValue(1);

    expect(randomInt(1, 10)).toEqual(10);

    mathRandomMock.mockReturnValue(0.5);

    expect(randomInt(1, 10)).toEqual(6);
  });
});
