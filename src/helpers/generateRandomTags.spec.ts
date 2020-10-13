import generateRandomTags from './generateRandomTags';

describe(`generateRandomTags`, () => {
  it(`generates an array of given number of Tag objects`, () => {
    const result = generateRandomTags(4);

    expect(result).toHaveLength(4);
  });

  it(`generates an array of randomly populated tags`, () => {
    const result = generateRandomTags(1);

    expect(result[0].color.length).toBeGreaterThan(0);
    expect(result[0].label.length).toBeGreaterThan(0);
  });
});
