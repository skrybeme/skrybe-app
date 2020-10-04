import StoryCard from './StoryCard';
import StoryTree from './StoryTree';
import { crawl, crawlBreadthFirst, crawlDeepFirst } from './Crawler';
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

  describe(`crawlBreadthFirst`, () => {
    it(`crawles each tree level from left to right starting with root node`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const leftChild = tree.makeNode(new StoryCard());
      const rightChild = tree.makeNode(new StoryCard());
      const leftGrandChild = tree.makeNode(new StoryCard());
      const rightGrandChild = tree.makeNode(new StoryCard());
      
      tree.insert(root);
      tree.insert(leftChild);
      tree.insert(rightChild);
      tree.insert(leftGrandChild, leftChild);
      tree.insert(rightGrandChild, rightChild);

      const result = crawlBreadthFirst<UuidType>(root, item => item.id);

      expect(result).toEqual([
        root.id,
        leftChild.id,
        rightChild.id,
        leftGrandChild.id,
        rightGrandChild.id
      ]);
    });
  });

  describe(`crawlDeepFirst`, () => {
    it(`crawles each tree node from top to bottom starting with root node`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const leftChild = tree.makeNode(new StoryCard());
      const rightChild = tree.makeNode(new StoryCard());
      const leftGrandChild = tree.makeNode(new StoryCard());
      const rightGrandChild = tree.makeNode(new StoryCard());
      
      tree.insert(root);
      tree.insert(leftChild);
      tree.insert(rightChild);
      tree.insert(leftGrandChild, leftChild);
      tree.insert(rightGrandChild, rightChild);

      const result = crawlDeepFirst<UuidType>(root, item => item.id);

      expect(result).toEqual([
        root.id,
        leftChild.id,
        leftGrandChild.id,
        rightChild.id,
        rightGrandChild.id
      ]);
    });
  });

  describe("default method", () => {
    test("deep first search is the default crawling method", () => {
      expect(crawl).toEqual(crawlDeepFirst);
    });
  });
});
