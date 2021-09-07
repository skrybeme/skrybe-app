import Tree from './Tree';
import { IIdentifiable } from '../interfaces';
import { UuidType } from '../common/types';
import { generateUuid } from '../utils';
import StoryTreeInfo from './StoryTreeInfo';
import { lorem } from 'faker';

class Identifiable implements IIdentifiable {
  constructor(private _id: UuidType = generateUuid()) {}

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
  describe(`property "info"`, () => {
    it(`returns null by default`, () => {  
      const tree = new Tree<Identifiable>();

      expect(tree.info).toBeNull();
    });

    it(`returns proper story tree info if such was defined`, () => {
      const storyTreeInfo = new StoryTreeInfo({ title: lorem.sentence() });

      const tree = new Tree<Identifiable>({ info: storyTreeInfo });

      expect(tree.info).toEqual(storyTreeInfo);
    });

    it(`allows to story tree info in existing object`, () => {
      const storyTreeInfo = new StoryTreeInfo({ title: lorem.sentence() });

      const tree = new Tree<Identifiable>({ info: storyTreeInfo });

      const updatedStoryTreeInfo = new StoryTreeInfo({ title: lorem.sentences() });

      tree.info = updatedStoryTreeInfo;

      expect(tree.info).toEqual(updatedStoryTreeInfo);
    });
  });

  describe(`equals`, () => {
    it(`returns true if given trees have the same nodes and the same structure`, () => {
      const treeA = new Tree<Identifiable>();
      const treeB = new Tree<Identifiable>();

      const nodeA = new Identifiable();
      const nodeB = new Identifiable();
      const nodeC = new Identifiable();
      const nodeD = new Identifiable();

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
      const treeA = new Tree<Identifiable>();
      const treeB = new Tree<Identifiable>();
      const treeC = new Tree<Identifiable>();

      const nodeA = new Identifiable();
      const nodeB = new Identifiable();
      const nodeC = new Identifiable();
      const nodeD = new Identifiable();

      treeA.insert(nodeA);
      treeA.insert(nodeB);
      treeA.insert(nodeC);
      treeA.insert(nodeD, nodeC.id);

      treeB.insert(nodeA);
      treeB.insert(nodeB);
      treeB.insert(nodeC);
      treeB.insert(nodeD);

      treeC.insert(new Identifiable());
      treeC.insert(nodeB);
      treeC.insert(nodeC);
      treeC.insert(nodeD, nodeC.id);

      expect(treeA.equals(treeB)).toBeFalsy();
      expect(treeA.equals(treeC)).toBeFalsy();
    });
  });

  describe(`getAllNodes`, () => {
    it(`returns empty map if none is passed to the tree`, () => {
      const tree = new Tree<Identifiable>();

      expect(tree.getAllNodes()).toEqual(new Map());
    });

    it(`returns a map of nodes`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();

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
      const tree = new Tree<Identifiable>();

      tree.insert(new Identifiable());

      expect(tree.getChildrenOf('invalid-uuid')).toBeNull();
    });

    it(`returns an empty array if the given node has no children`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getChildrenOf(rootChild.id)).toEqual([]);
    });

    it(`returns an array of children of the node`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();
      const leftGrandRootChild = new Identifiable();
      const rightGrandRootChild = new Identifiable();

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
      const tree = new Tree<Identifiable>();

      tree.insert(new Identifiable());

      expect(tree.getNodeById('invalid-uuid')).toBeNull();
    });

    it(`returns node by given id`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();
      const rootGrandChild = new Identifiable();

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
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();

      tree.insert(root);

      expect(tree.getParentOf(root.id)).toBeNull();
    });

    it(`returns null if given node does not exist in the tree`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getParentOf('invalid-uuid')).toBeNull();
    });

    it(`returns parent node object`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getParentOf(rootChild.id)).toEqual(root);
    });
  });

  describe(`getRoot`, () => {
    it(`returns null if there are no nodes in the tree`, () => {
      const tree = new Tree<Identifiable>();

      expect(tree.getRoot()).toBeNull();
    });

    it(`returns root of the tree`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();

      tree.insert(root);
      tree.insert(new Identifiable());
      tree.insert(new Identifiable());

      expect(tree.getRoot()).toEqual(root);
    });
  });

  describe(`getSubtreeById`, () => {
    it(`returns null if the node with given id does not exist`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();

      tree.insert(root);

      const result = tree.getSubtreeById('invalid-uuid');

      expect(result).toBeNull();
    });

    it(`returns tree with the node with given id as a root`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const leftRootChild = new Identifiable();
      const rightRootChild = new Identifiable();
      const leftGrandRootChild = new Identifiable();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      const subtree = new Tree<Identifiable>();

      subtree.insert(leftRootChild);
      subtree.insert(leftGrandRootChild);

      const result = tree.getSubtreeById(leftRootChild.id)!;

      expect(result.equals(subtree)).toBeTruthy();
      expect(result.getRoot()).toEqual(leftRootChild);
    });
  });

  describe(`insert`, () => {
    it(`adds root if the tree is empty`, () => {
      const tree = new Tree<Identifiable>();
      const node = new Identifiable();

      tree.insert(node);

      const root = tree.getRoot();

      expect(root).toEqual(node);
    });

    it(`adds node as a child of root if parent node is not given`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();

      tree.insert(root);
      tree.insert(rootChild);

      expect(tree.getChildrenOf(root.id)?.length).toEqual(1);
      expect(tree.getChildrenOf(root.id)?.[0]).toEqual(rootChild);
      expect(tree.getParentOf(rootChild.id)).toEqual(root);
    });

    it(`adds node as a child of given parent`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const leftRootChild = new Identifiable();
      const rightRootChild = new Identifiable();
      const leftGrandRootChild = new Identifiable();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild);
      tree.insert(leftGrandRootChild, leftRootChild.id);

      expect(tree.getChildrenOf(leftRootChild.id)?.length).toEqual(1);
      expect(tree.getChildrenOf(leftRootChild.id)?.[0]).toEqual(leftGrandRootChild);
      expect(tree.getParentOf(leftGrandRootChild.id)).toEqual(leftRootChild);
    });

    it(`adds node as a child of given parent on desired position`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const leftRootChild = new Identifiable();
      const rightRootChild = new Identifiable();
      const middleRootChild = new Identifiable();
      const afterMiddleRootChild = new Identifiable();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild, root.id);
      tree.insert(middleRootChild, root.id, {
        afterOrBefore: 'before',
        nodeId: rightRootChild.id,
      });
      tree.insert(afterMiddleRootChild, root.id, {
        afterOrBefore: 'after',
        nodeId: middleRootChild.id,
      });

      expect(tree.getChildrenOf(root.id)?.length).toEqual(4);
      expect(tree.getChildrenOf(root.id)).toEqual([
        leftRootChild,
        middleRootChild,
        afterMiddleRootChild,
        rightRootChild
      ]);
    });

    it(`adds node as last child of given parent if place-after-node is the last child`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const leftRootChild = new Identifiable();
      const rightRootChild = new Identifiable();
      const lastRootChild = new Identifiable();

      tree.insert(root);
      tree.insert(leftRootChild);
      tree.insert(rightRootChild, root.id);
      tree.insert(lastRootChild, root.id, {
        afterOrBefore: 'after',
        nodeId: rightRootChild.id,
      });

      expect(tree.getChildrenOf(root.id)?.length).toEqual(3);
      expect(tree.getChildrenOf(root.id)).toEqual([
        leftRootChild,
        rightRootChild,
        lastRootChild
      ]);
    });

    it(`throws error if the the tree is rootless, parent node is given and it is not the root`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const node = new Identifiable();

      tree.insert(root);

      expect(() => tree.insert(node, 'invalid-uuid')).toThrow();
    });

    it(`throws error if given parent does not exist`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const rootChild = new Identifiable();
      const node = new Identifiable();

      tree.insert(root);
      tree.insert(rootChild);

      expect(() => tree.insert(node, 'invalid-uuid')).toThrow();
    });

    it(`throws error if given place-after-node does not exist`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const node = new Identifiable();

      tree.insert(root);

      expect(() => tree.insert(node, root.id, {
        afterOrBefore: 'after',
        nodeId: 'invalid-uuid',
      })).toThrow();
    });

    it(`throws error if given place-before-node does not exist`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const node = new Identifiable();

      tree.insert(root);

      expect(() => tree.insert(node, root.id, {
        afterOrBefore: 'before',
        nodeId: 'invalid-uuid',
      })).toThrow();
    });
  });

  describe(`removeById`, () => {
    it(`throws error if given node does not exist`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const node = new Identifiable();

      tree.insert(root);
      tree.insert(node);

      expect(() => tree.removeById('invalid-uuid')).toThrow();
    });

    it(`removes node with all its children from the tree`, () => {
      const tree = new Tree<Identifiable>();
      const root = new Identifiable();
      const leftRootChild = new Identifiable();
      const rightRootChild = new Identifiable();
      const leftGrandRootChild = new Identifiable();

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
