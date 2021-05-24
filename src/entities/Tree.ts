import { IIdentifiable, ITree, ITreeNodeContext, ITreeProps } from '@/interfaces';
import { Maybe, UuidType } from '@/common/types';
import { crawl } from './Crawler';
import isEqual from 'lodash/isEqual';
import { generateUuid } from '@/utils';

class TreeMap<TNode> extends Map<UuidType, ITreeNodeContext<TNode>> {
  static toNativeMap<TNode>(map: TreeMap<TNode>): Map<UuidType, TNode> {
    const out = new Map<UuidType, TNode>();

    map.forEach((value: ITreeNodeContext<TNode>, key: UuidType) => {
      out.set(key, value.node);
    });

    return out;
  }
}

class Tree<TNode extends IIdentifiable> implements ITree<TNode, TreeMap<TNode>> {
  protected _id: UuidType;
  protected _tree: TreeMap<TNode> = new TreeMap<TNode>();

  constructor(
    tree: TreeMap<TNode> = new TreeMap<TNode>(),
    id: UuidType = generateUuid()
  ) {
    this._id = id;
    this._tree = tree;
  }

  equals(tree: Tree<TNode>): boolean {
    return isEqual(this._tree, tree.getRawTreeMap());
  }

  getAllNodes(): Map<UuidType, TNode> {
    return TreeMap.toNativeMap(this._tree);
  }

  getChildrenOf(id: UuidType): Maybe<Array<TNode>> {
    const node = this._tree.get(id);

    if (!node) {
      return null;
    }

    const childrenIds = node.childrenIds;

    if (!childrenIds.length) {
      return [];
    }

    const nativeTree = TreeMap.toNativeMap(this._tree);
    const out: Array<TNode> = [];

    childrenIds.map((childId: UuidType) => {
      const childNode = nativeTree.get(childId);

      if (childNode) {
        out.push(childNode);
      }
    });

    return out;
  }

  getNodeContextChildrenOf(id: UuidType): Maybe<Array<ITreeNodeContext<TNode>>> {
    const node = this._tree.get(id);

    if (!node) {
      return null;
    }

    const childrenIds = node.childrenIds;

    if (!childrenIds.length) {
      return [];
    }

    const out: Array<ITreeNodeContext<TNode>> = [];

    childrenIds.map((childId: UuidType) => {
      const childNode = this.getNodeContextById(childId);

      if (childNode) {
        out.push(childNode);
      }
    });

    return out;
  }

  getNodeById(id: UuidType): Maybe<TNode> {
    return this.getNodeContextById(id)?.node || null;
  }

  getNodeContextById(id: UuidType): Maybe<ITreeNodeContext<TNode>> {
    return this._tree.get(id) || null;
  }

  getRawTreeMap(): TreeMap<TNode> {
    return this._tree;
  }

  getRoot(): Maybe<TNode> {
    const rootTreeNode = this.getRootContext()

    return rootTreeNode ? rootTreeNode.node : null;
  }

  getParentOf(id: UuidType): Maybe<TNode> {
    const node = this.getNodeContextById(id);

    if (!node?.parentId) {
      return null;
    }

    const parentNode = this.getNodeContextById(node?.parentId);

    return parentNode?.node || null;
  }

  getRootContext(): Maybe<ITreeNodeContext<TNode>> {
    if (!this._tree.size) {
      return null;
    }

    let out: Maybe<ITreeNodeContext<TNode>> = null;

    this._tree.forEach((value: ITreeNodeContext<TNode>) => {
      if (value.isRoot) {
        out = value;

        return;
      }
    });

    return out;
  }

  getSubtreeById(id: UuidType): Maybe<Tree<TNode>> {
    const nodeIds = crawl(
      this,
      (nodeContext: ITreeNodeContext<TNode>): UuidType => nodeContext.node.id,
      id
    );

    if (nodeIds && !nodeIds.length) {
      return null;
    }

    const map = new TreeMap<TNode>();

    nodeIds.forEach((nodeId: UuidType): void => {
      const treeNode = this._tree.get(nodeId)!;

      if (nodeId === id) {
        treeNode.isRoot = true;
        treeNode.parentId = "";
      }

      map.set(nodeId, treeNode);
    });

    return new Tree<TNode>(map, generateUuid());
  }

  get id() {
    return this._id;
  }

  insert(
    node: TNode,
    parentNodeId?: UuidType,
    placeBeforeNodeId?: UuidType
  ): void {
    if (this._tree.size === 0) {
      this._tree.set(node.id, {
        childrenIds: [],
        isRoot: true,
        node,
        parentId: "",
      });

      return;
    }

    if (!parentNodeId) {
      const root = this.getRootContext();

      root?.childrenIds.push(node.id);

      this._tree.set(node.id, {
        childrenIds: [],
        isRoot: false,
        node,
        parentId: root!.node.id,
      });

      return;
    }

    const parentNode = this.getNodeContextById(parentNodeId);

    if (!parentNode) {
      throw new Error(
        `The parent node with ID "${parentNodeId}" does not exist in the Tree.`
      );
    }

    if (placeBeforeNodeId) {
      const placeIndex = parentNode.childrenIds.indexOf(placeBeforeNodeId);

      if (placeIndex < 0) {
        throw new Error(
          `Given place-before-node ID "${parentNodeId}" does not exist in the Tree.`
        );
      }

      parentNode?.childrenIds.splice(placeIndex!, 0, node.id);
    } else {
      parentNode?.childrenIds.push(node.id);
    }

    this._tree.set(node.id, {
      childrenIds: [],
      isRoot: false,
      node,
      parentId: parentNode!.node.id,
    });
  }

  removeById(id: UuidType): void {
    if (!this._tree.has(id)) {
      throw new Error(`Node with given ID does not exist in the story tree.`);
    }

    crawl(this, (nodeContext: ITreeNodeContext<TNode>): void => {
      this._tree.delete(nodeContext.node.id);
    }, id);
  }
}

export default Tree;
