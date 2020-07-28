import StoryCard from './StoryCard';
import StoryTree from './StoryTree';
import StoryTreeNode from './StoryTreeNode';

describe(`StoryTreeNode`, () => {
  describe(`addChild`, () => {
    it(`adds child to given node`, () => {
      const tree = new StoryTree();
      const node = new StoryTreeNode(tree, new StoryCard());
      const child = new StoryTreeNode(tree, new StoryCard());

      node.addChild(child);

      expect(node.getChildren().length).toEqual(1);
    });

    it(`does not allow adding the same child twice`, () => {
      const tree = new StoryTree();
      const node = new StoryTreeNode(tree, new StoryCard());
      const child = new StoryTreeNode(tree, new StoryCard());

      node.addChild(child);

      expect(() => node.addChild(child)).toThrow();
    });
  });

  describe(`getStoryCard`, () => {
    it(`returns story card object bound to the node`, () => {
      const tree = new StoryTree();
      const card = new StoryCard();
      const node = new StoryTreeNode(tree, card);

      expect(node.getStoryCard()).toEqual(card);
    });
  });

  describe(`getTree`, () => {
    it(`returns tree bound to the node`, () => {
      const tree = new StoryTree();
      const node = new StoryTreeNode(tree, new StoryCard());

      expect(node.getTree()).toEqual(tree);
    });
  });
});
