import StoryCard from './StoryCard';
import StoryTree from './StoryTree';

describe(`StoryTree`, () => {
  describe(`getAllNodes`, () => {
    it(`returns empty map if none is passed to the tree`, () => {
      const tree = StoryTree.create();

      expect(tree.getAllNodes()).toEqual(new Map());
    });

    it(`returns a map of nodes`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);

      const entries = tree.getAllNodes().entries();
      const entriesMappedtoArray = Array.from(entries);
  
      expect(entriesMappedtoArray).toEqual([
        [
          root.id,
          root
        ],
        [
          rootChild.id,
          rootChild
        ]
      ]);
    });
  });

  describe(`getChildrenOf`, () => {
    it(`returns null if node with given id does not exist`, () => {
      const tree = StoryTree.create();

      tree.insert(StoryCard.create());

      expect(tree.getChildrenOf('invalid-uuid')).toBeNull();
    });

    it(`returns an empty array if the given node has no children`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getChildrenOf(rootChild.id)).toEqual([]);
    });

    it(`returns an array of children of the node`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();
      const leftGrandRootChild = StoryCard.create();
      const rightGrandRootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);
      tree.insert(leftGrandRootChild, rootChild.id);
      tree.insert(rightGrandRootChild, rootChild.id);

      expect(tree.getChildrenOf(rootChild.id)).toEqual([
        leftGrandRootChild,
        rightGrandRootChild
      ]);
    });
  });

  describe(`getNodeById`, () => {
    it(`returns null if the node with given id does not exists`, () => {
      const tree = StoryTree.create();

      tree.insert(StoryCard.create());

      expect(tree.getNodeById('invalid-uuid')).toBeNull();
    });

    it(`returns node by given id`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();
      const rootGrandChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);
      tree.insert(rootGrandChild, rootChild.id);

      expect(tree.getNodeById(root.id)).toEqual(root);
      expect(tree.getNodeById(rootChild.id)).toEqual(rootChild);
      expect(tree.getNodeById(rootGrandChild.id)).toEqual(rootGrandChild);
    });
  });

  describe(`getParentOf`, () => {
    it(`returns null if given node is root`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();

      tree.insert(root);

      expect(tree.getParentOf(root.id)).toBeNull();
    });

    it(`returns null if given node does not exist in the tree`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getParentOf('invalid-uuid')).toBeNull();
    });

    it(`returns parent node object`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getParentOf(rootChild.id)).toEqual(root);
    });
  });

  describe(`getRoot`, () => {
    it(`returns null if there are no nodes in the tree`, () => {
      const tree = StoryTree.create();

      expect(tree.getRoot()).toBeNull();
    });

    it(`returns root of the tree`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();

      tree.insert(root);
      tree.insert(StoryCard.create());
      tree.insert(StoryCard.create());

      expect(tree.getRoot()).toEqual(root);
    });
  });

  describe(`getSubtreeById`, () => {
    xit(`returns null if the node with given id does not exist`, () => {});

    xit(`returns tree with the node with given id as a root`, () => {});
  });

  describe(`insert`, () => {
    it(`adds root if the tree is empty`, () => {
      const tree = StoryTree.create();
      const node = StoryCard.create();

      tree.insert(node);

      const root = tree.getRoot();

      expect(root).toEqual(node);
    });

    it(`adds node as a child of root if parent node is not given`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getChildrenOf(root.id)?.length).toEqual(1);
      expect(tree.getChildrenOf(root.id)?.[0]).toEqual(rootChild);
      expect(tree.getParentOf(rootChild.id)).toEqual(root);
    });

    it(`adds node as a child of given parent`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const leftRootChild = StoryCard.create();
      const rightRootChild = StoryCard.create();
      const leftGrandRootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      expect(tree.getChildrenOf(leftRootChild.id)?.length).toEqual(1);
      expect(tree.getChildrenOf(leftRootChild.id)?.[0]).toEqual(leftGrandRootChild);
      expect(tree.getParentOf(leftGrandRootChild.id)).toEqual(leftRootChild);
    });

    it(`adds node as a child of given parent on desired position`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const leftRootChild = StoryCard.create();
      const rightRootChild = StoryCard.create();
      const middleRootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild, root.id);
      tree.insert(middleRootChild, root.id, rightRootChild.id);

      expect(tree.getChildrenOf(root.id)?.length).toEqual(3);
      expect(tree.getChildrenOf(root.id)).toEqual([
        leftRootChild,
        middleRootChild,
        rightRootChild
      ]);
    });

    it(`throws error if the the tree is rootless, parent node is given and it is not the root`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const node = StoryCard.create();

      tree.insert(root);

      expect(() => tree.insert(node, 'invalid-uuid')).toThrow();
    });

    it(`throws error if given parent does not exist`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const rootChild = StoryCard.create();
      const node = StoryCard.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(() => tree.insert(node, 'invalid-uuid')).toThrow();
    });

    it(`throws error if given place-before-node does not exist`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const node = StoryCard.create();

      tree.insert(root);

      expect(() => tree.insert(node, root.id, 'invalid-uuid')).toThrow();
    });
  });

  describe(`removeById`, () => {
    it(`throws error if given node does not exist`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const node = StoryCard.create();

      tree.insert(root);
      tree.insert(node);

      expect(() => tree.removeById('invalid-uuid')).toThrow();
    });

    xit(`removes node with all its children from the tree`, () => {
      const tree = StoryTree.create();
      const root = StoryCard.create();
      const leftRootChild = StoryCard.create();
      const rightRootChild = StoryCard.create();
      const leftGrandRootChild = StoryCard.create();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      tree.removeById(leftRootChild.id);

      const entries = tree.getAllNodes().entries();
      const entriesMappedtoArray = Array.from(entries);

      expect(entriesMappedtoArray).toEqual([
        root,
        rightRootChild
      ]);
    });
  });
});
