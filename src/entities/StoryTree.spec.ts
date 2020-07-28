import StoryCard from './StoryCard';
import StoryTree from './StoryTree';
import StoryTreeNode from './StoryTreeNode';

describe(`StoryTree`, () => {
  describe(`insert`, () => {
    it(`adds root if the tree is empty`, () => {
      const tree = new StoryTree();
      const node = new StoryTreeNode(tree, new StoryCard());

      tree.insert(node);

      const root = tree.getRoot();

      expect(root).toEqual(node);
    });

    it(`adds node as a child of root if parent node is not given`, () => {
      const tree = new StoryTree();
      const root = new StoryTreeNode(tree, new StoryCard());
      const rootChild = new StoryTreeNode(tree, new StoryCard());

      tree.insert(root);
      tree.insert(rootChild);

      expect(root.getChildren().length).toEqual(1);
      expect(root.getChildren()[0]).toEqual(rootChild);
    });

    it(`adds node as a child of given parent`, () => {
      const tree = new StoryTree();
      const root = new StoryTreeNode(tree, new StoryCard());
      const rootChild = new StoryTreeNode(tree, new StoryCard());
      const rootGrandChild = new StoryTreeNode(tree, new StoryCard());

      tree.insert(root);
      tree.insert(rootChild);
      tree.insert(rootGrandChild, rootChild);

      expect(root.getChildren().length).toEqual(1);
      expect(rootChild.getChildren().length).toEqual(1);
      expect(rootChild.getChildren()[0]).toEqual(rootGrandChild);
    });

    it(`throws error if given parent does not exist`, () => {
      const tree = new StoryTree();
      const root = new StoryTreeNode(tree, new StoryCard());
      const child = new StoryTreeNode(tree, new StoryCard());

      tree.insert(root);

      expect(() => tree.insert(child, new StoryTreeNode(tree, new StoryCard()))).toThrow();
    });
  });

  describe(`getRoot`, () => {
    it(`returns null if there is nodes in the tree`, () => {
      const tree = new StoryTree();

      expect(tree.getRoot()).toBeNull();
    });
  });

  describe(`findById`, () => {
    it(`returns bound the tree node with given id`, () => {
      const tree = new StoryTree();
      const root = new StoryTreeNode(tree, new StoryCard());
      const node = new StoryTreeNode(tree, new StoryCard());

      tree.insert(root);
      tree.insert(node);

      expect(tree.findById(node.id)).toEqual(node);
    });
  });

  describe(`remove`, () => {
    it(`throws error if given node does not exist`, () => {
      const tree = new StoryTree();
      const node = new StoryTreeNode(tree, new StoryCard());

      expect(() => tree.remove(node)).toThrow();
    });

    it(`removes node with all its children from the tree`, () => {
      const tree = new StoryTree();
      const root = new StoryTreeNode(tree, new StoryCard());
      const rootChild = new StoryTreeNode(tree, new StoryCard());
      const rootGrandChild = new StoryTreeNode(tree, new StoryCard());

      tree.insert(root);
      tree.insert(rootChild);
      tree.insert(rootGrandChild, rootChild);

      tree.remove(rootChild);

      expect(tree.getAllNodes().size).toEqual(1);
    });
  });
});
