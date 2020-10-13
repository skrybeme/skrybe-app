import { byTagsStrategy, edgeNodesStrategy, specifiedNodesStrategy } from './strategies';
import { defaultNestedCardTree } from '../data';

describe(`Generator Strategies`, () => {
  describe(`Edge Nodes Strategy`, () => {
    it(`Returns ordered list of nodes which have no subcards.`, () => {
      const data = defaultNestedCardTree;
      const expected = [
        { id: 6 },
        { id: 11 },
        { id: 12 },
        { id: 8 },
        { id: 9 },
        { id: 4 },
        { id: 10 }
      ];

      const recieved = edgeNodesStrategy(data);

      expect(recieved).toMatchObject(expected);
    });
  });

  describe(`Specified Nodes Strategy`, () => {
    it(`Returns ordered list of nodes with given ids.`, () => {
      const data = defaultNestedCardTree;
      const expected = [
        { id: 1 },
        { id: 6 },
        { id: 12 },
        { id: 9 },
        { id: 5 },
        { id: 10 }
      ];

      const recieved = specifiedNodesStrategy([10, 9, 5, 6, 1, 12], data);

      expect(recieved).toMatchObject(expected);
    });
  });

  describe(`By Tags Strategy`, () => {
    it(`Returns ordered list of nodes with at least one of the given tags.`, () => {
      const data = defaultNestedCardTree;
      const expected = [
        { id: 1 },
        { id: 2 },
        { id: 6 },
        { id: 7 },
        { id: 11 },
        { id: 12 },
        { id: 3 }
      ];

      const recieved = byTagsStrategy([4, 2], data);

      expect(recieved).toMatchObject(expected);
    });
  });
});
