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

      expect(node.getChildrenIds().length).toEqual(1);
    });

    it(`adds child to given node on desired position`, () => {
      const tree = new StoryTree();
      const node = new StoryTreeNode(tree, new StoryCard());
      const child = new StoryTreeNode(tree, new StoryCard());
      const childAfter = new StoryTreeNode(tree, new StoryCard());
      const childBefore = new StoryTreeNode(tree, new StoryCard());

      node.addChild(child);
      node.addChild(childAfter);

      expect(node.getChildrenIds()[0]).toEqual(child.id);

      node.addChild(childBefore, child);

      expect(node.getChildrenIds()[0]).toEqual(childBefore.id);
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
