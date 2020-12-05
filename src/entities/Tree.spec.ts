import Tree from './Tree';
import { IIdentifiable } from '../interfaces';
import { UuidType } from '../common/types';
import { generateUuid } from '../utils';

class Identifiable implements IIdentifiable {
  private constructor(private _id: UuidType) {}

  static create(): Identifiable {
    return new Identifiable(generateUuid());
  }

  get id() {
    return this._id;
  }
}

// @TODO
// Refactor this tests in order for the nodes to have more descriptive names.
// Each tested tree should be presented in a form of a Comment, like so:
// //       A
// //    B     C
// //  D   E F   G
// // H I

describe(`StoryTree`, () => {
  describe(`equals`, () => {
    it(`returns true if given trees have the same nodes and the same structure`, () => {
      const treeA = Tree.create<Identifiable>();
      const treeB = Tree.create<Identifiable>();

      const nodeA = Identifiable.create();
      const nodeB = Identifiable.create();
      const nodeC = Identifiable.create();
      const nodeD = Identifiable.create();

      treeA.insert(nodeA);
      treeA.insert(nodeB);
      treeA.insert(nodeC);
      treeA.insert(nodeD, nodeC.id);

      treeB.insert(nodeA);
      treeB.insert(nodeB);
      treeB.insert(nodeC);
      treeB.insert(nodeD, nodeC.id);

      expect(treeA.equals(treeB)).toBeTruthy();
      expect(treeB.equals(treeA)).toBeTruthy();
    });

    it(`returns false if given trees have not the same nodes or the same structure`, () => {
      const treeA = Tree.create<Identifiable>();
      const treeB = Tree.create<Identifiable>();
      const treeC = Tree.create<Identifiable>();

      const nodeA = Identifiable.create();
      const nodeB = Identifiable.create();
      const nodeC = Identifiable.create();
      const nodeD = Identifiable.create();

      treeA.insert(nodeA);
      treeA.insert(nodeB);
      treeA.insert(nodeC);
      treeA.insert(nodeD, nodeC.id);

      treeB.insert(nodeA);
      treeB.insert(nodeB);
      treeB.insert(nodeC);
      treeB.insert(nodeD);

      treeC.insert(Identifiable.create());
      treeC.insert(nodeB);
      treeC.insert(nodeC);
      treeC.insert(nodeD, nodeC.id);

      expect(treeA.equals(treeB)).toBeFalsy();
      expect(treeA.equals(treeC)).toBeFalsy();
    });
  });

  describe(`getAllNodes`, () => {
    it(`returns empty map if none is passed to the tree`, () => {
      const tree = Tree.create<Identifiable>();

      expect(tree.getAllNodes()).toEqual(new Map());
    });

    it(`returns a map of nodes`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();

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
      const tree = Tree.create<Identifiable>();

      tree.insert(Identifiable.create());

      expect(tree.getChildrenOf('invalid-uuid')).toBeNull();
    });

    it(`returns an empty array if the given node has no children`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getChildrenOf(rootChild.id)).toEqual([]);
    });

    it(`returns an array of children of the node`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();
      const leftGrandRootChild = Identifiable.create();
      const rightGrandRootChild = Identifiable.create();

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
      const tree = Tree.create<Identifiable>();

      tree.insert(Identifiable.create());

      expect(tree.getNodeById('invalid-uuid')).toBeNull();
    });

    it(`returns node by given id`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();
      const rootGrandChild = Identifiable.create();

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
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();

      tree.insert(root);

      expect(tree.getParentOf(root.id)).toBeNull();
    });

    it(`returns null if given node does not exist in the tree`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getParentOf('invalid-uuid')).toBeNull();
    });

    it(`returns parent node object`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getParentOf(rootChild.id)).toEqual(root);
    });
  });

  describe(`getRoot`, () => {
    it(`returns null if there are no nodes in the tree`, () => {
      const tree = Tree.create<Identifiable>();

      expect(tree.getRoot()).toBeNull();
    });

    it(`returns root of the tree`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();

      tree.insert(root);
      tree.insert(Identifiable.create());
      tree.insert(Identifiable.create());

      expect(tree.getRoot()).toEqual(root);
    });
  });

  describe(`getSubtreeById`, () => {
    it(`returns null if the node with given id does not exist`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();

      tree.insert(root);

      const result = tree.getSubtreeById('invalid-uuid');

      expect(result).toBeNull();
    });

    it(`returns tree with the node with given id as a root`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const leftRootChild = Identifiable.create();
      const rightRootChild = Identifiable.create();
      const leftGrandRootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      const subtree = Tree.create<Identifiable>();

      subtree.insert(leftRootChild);
      subtree.insert(leftGrandRootChild);

      const result = tree.getSubtreeById(leftRootChild.id)!;

      expect(result.equals(subtree)).toBeTruthy();
      expect(result.getRoot()).toEqual(leftRootChild);
    });
  });

  describe(`insert`, () => {
    it(`adds root if the tree is empty`, () => {
      const tree = Tree.create<Identifiable>();
      const node = Identifiable.create();

      tree.insert(node);

      const root = tree.getRoot();

      expect(root).toEqual(node);
    });

    it(`adds node as a child of root if parent node is not given`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getChildrenOf(root.id)?.length).toEqual(1);
      expect(tree.getChildrenOf(root.id)?.[0]).toEqual(rootChild);
      expect(tree.getParentOf(rootChild.id)).toEqual(root);
    });

    it(`adds node as a child of given parent`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const leftRootChild = Identifiable.create();
      const rightRootChild = Identifiable.create();
      const leftGrandRootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      expect(tree.getChildrenOf(leftRootChild.id)?.length).toEqual(1);
      expect(tree.getChildrenOf(leftRootChild.id)?.[0]).toEqual(leftGrandRootChild);
      expect(tree.getParentOf(leftGrandRootChild.id)).toEqual(leftRootChild);
    });

    it(`adds node as a child of given parent on desired position`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const leftRootChild = Identifiable.create();
      const rightRootChild = Identifiable.create();
      const middleRootChild = Identifiable.create();

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
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const node = Identifiable.create();

      tree.insert(root);

      expect(() => tree.insert(node, 'invalid-uuid')).toThrow();
    });

    it(`throws error if given parent does not exist`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const rootChild = Identifiable.create();
      const node = Identifiable.create();

      tree.insert(root);
      tree.insert(rootChild);

      expect(() => tree.insert(node, 'invalid-uuid')).toThrow();
    });

    it(`throws error if given place-before-node does not exist`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const node = Identifiable.create();

      tree.insert(root);

      expect(() => tree.insert(node, root.id, 'invalid-uuid')).toThrow();
    });
  });

  describe(`removeById`, () => {
    it(`throws error if given node does not exist`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const node = Identifiable.create();

      tree.insert(root);
      tree.insert(node);

      expect(() => tree.removeById('invalid-uuid')).toThrow();
    });

    it(`removes node with all its children from the tree`, () => {
      const tree = Tree.create<Identifiable>();
      const root = Identifiable.create();
      const leftRootChild = Identifiable.create();
      const rightRootChild = Identifiable.create();
      const leftGrandRootChild = Identifiable.create();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      tree.removeById(leftRootChild.id);

      const entries = tree.getAllNodes().entries();
      const entriesMappedtoArray = Array.from(entries);

      expect(entriesMappedtoArray).toEqual([
        [
          root.id,
          root
        ],
        [
          rightRootChild.id,
          rightRootChild
        ]
      ]);
    });
  });
});
