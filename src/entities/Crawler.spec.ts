import StoryCard from './StoryCard';
import StoryTree from './StoryTree';
import { crawl } from './Crawler';
import { UuidType } from '../common/types';

describe(`Crawler`, () => {
  describe(`crawl`, () => {
    it(`returns array of crawled entities mapped with callback function`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const node = tree.makeNode(new StoryCard());

      tree.insert(root);
      tree.insert(node);

      const result = crawl<UuidType>(root, item => item.id);

      expect(result).toEqual([root.id, node.id]);
    });
  });
});
