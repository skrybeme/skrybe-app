import { IIdentifiable, ITree, ITreeNodeProps, ITreeProps } from '@/interfaces';
import { Maybe, UuidType } from '@/common/types';
import { crawl } from './Crawler';
import isEqual from 'lodash/isEqual';
import { generateUuid } from '@/utils';

class TreeMap<T> extends Map<UuidType, ITreeNodeProps<T>> {
  static toNativeMap<T>(map: TreeMap<T>): Map<UuidType, T> {
    const out = new Map<UuidType, T>();

    map.forEach((value: ITreeNodeProps<T>, key: UuidType) => {
      out.set(key, value.node);
    });

    return out;
  }
}

class Tree<T extends IIdentifiable> implements ITree<T, TreeMap<T>> {
  protected constructor(
    protected _tree: TreeMap<T> = new TreeMap<T>(),
    protected _id: UuidType
  ) {}

  static create<T extends IIdentifiable>(
    props?: ITreeProps,
    id: UuidType = generateUuid()
  ): Tree<T> {
    return new Tree<T>(undefined, id);
  }

  equals(tree: Tree<T>): boolean {
    return isEqual(this._tree, tree.getRawTreeMap());
  }

  getAllNodes(): Map<UuidType, T> {
    return TreeMap.toNativeMap(this._tree);
  }

  getChildrenOf(id: UuidType): Maybe<Array<T>> {
    const node = this._tree.get(id);

    if (!node) {
      return null;
    }

    const childrenIds = node.childrenIds;

    if (!childrenIds.length) {
      return [];
    }

    const nativeTree = TreeMap.toNativeMap(this._tree);
    const out: Array<T> = [];

    childrenIds.map((childId: UuidType) => {
      const childNode = nativeTree.get(childId);

      if (childNode) {
        out.push(childNode);
      }
    });

    return out;
  }

  getNodeById(id: UuidType): Maybe<T> {
    return this.getTreeNodeById(id)?.node || null;
  }

  protected getTreeNodeById(id: UuidType): Maybe<ITreeNodeProps<T>> {
    return this._tree.get(id) || null;
  }

  getRawTreeMap(): TreeMap<T> {
    return this._tree;
  }

  getRoot(): Maybe<T> {
    const rootTreeNode = this.getRootTreeNode()

    return rootTreeNode ? rootTreeNode.node : null;
  }

  getParentOf(id: UuidType): Maybe<T> {
    const node = this.getTreeNodeById(id);

    if (!node?.parentId) {
      return null;
    }

    const parentNode = this.getTreeNodeById(node?.parentId);

    return parentNode?.node || null;
  }

  protected getRootTreeNode(): Maybe<ITreeNodeProps<T>> {
    if (!this._tree.size) {
      return null;
    }

    let out: Maybe<ITreeNodeProps<T>> = null;

    this._tree.forEach((value: ITreeNodeProps<T>) => {
      if (value.isRoot) {
        out = value;

        return;
      }
    });

    return out;
  }

  getSubtreeById(id: UuidType): Maybe<Tree<T>> {
    const nodeIds = crawl(this, (node: T): UuidType => node.id, id);

    if (nodeIds && !nodeIds.length) {
      return null;
    }

    const map = new TreeMap<T>();

    nodeIds.forEach((nodeId: UuidType): void => {
      const treeNode = this._tree.get(nodeId)!;

      if (nodeId === id) {
        treeNode.isRoot = true;
        treeNode.parentId = "";
      }

      map.set(nodeId, treeNode);
    });

    return new Tree<T>(map, generateUuid());
  }

  get id() {
    return this._id;
  }

  insert(
    node: T,
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
      const root = this.getRootTreeNode();

      root?.childrenIds.push(node.id);

      this._tree.set(node.id, {
        childrenIds: [],
        isRoot: false,
        node,
        parentId: root!.node.id,
      });

      return;
    }

    const parentNode = this.getTreeNodeById(parentNodeId);

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

    crawl(this, (node: T): void => {
      this._tree.delete(node.id);
    }, id);
  }
}

export default Tree;