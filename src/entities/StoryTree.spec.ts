import StoryCard from './StoryCard';
import StoryTree from './StoryTree';

describe(`StoryTree`, () => {
  describe(`makeNode`, () => {
    it(`makes StoryTreeNode from StoryCard and binds it to the tree`, () => {
      const tree = new StoryTree();
      const node = tree.makeNode(new StoryCard());

      expect(node.getTree()).toEqual(tree);
    });
  });

  describe(`insert`, () => {
    it(`adds root if the tree is empty`, () => {
      const tree = new StoryTree();
      const node = tree.makeNode(new StoryCard());

      tree.insert(node);

      const root = tree.getRoot();

      expect(root).toEqual(node);
    });

    it(`adds node as a child of root if parent node is not given`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const rootChild = tree.makeNode(new StoryCard());

      tree.insert(root);
      tree.insert(rootChild);

      expect(root.getChildrenIds().length).toEqual(1);
      expect(root.getChildrenIds()[0]).toEqual(rootChild.id);
    });

    it(`adds node as a child of given parent`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const rootChild = tree.makeNode(new StoryCard());
      const rootGrandChild = tree.makeNode(new StoryCard());

      tree.insert(root);
      tree.insert(rootChild);
      tree.insert(rootGrandChild, rootChild);

      expect(root.getChildrenIds().length).toEqual(1);
      expect(rootChild.getChildrenIds().length).toEqual(1);
      expect(rootChild.getChildrenIds()[0]).toEqual(rootGrandChild.id);
    });

    it(`throws error if given parent does not exist`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const child = tree.makeNode(new StoryCard());

      tree.insert(root);

      expect(() => tree.insert(child, tree.makeNode(new StoryCard()))).toThrow();
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
      const root = tree.makeNode(new StoryCard());
      const node = tree.makeNode(new StoryCard());

      tree.insert(root);
      tree.insert(node);

      expect(tree.findById(node.id)).toEqual(node);
    });
  });

  describe(`remove`, () => {
    it(`throws error if given node does not exist`, () => {
      const tree = new StoryTree();
      const node = tree.makeNode(new StoryCard());

      expect(() => tree.remove(node)).toThrow();
    });

    it(`removes node with all its children from the tree`, () => {
      const tree = new StoryTree();
      const root = tree.makeNode(new StoryCard());
      const rootChild = tree.makeNode(new StoryCard());
      const rootGrandChild = tree.makeNode(new StoryCard());

      tree.insert(root);
      tree.insert(rootChild);
      tree.insert(rootGrandChild, rootChild);

      tree.remove(rootChild);

      expect(tree.getAllNodes().size).toEqual(1);
    });
  });
});
