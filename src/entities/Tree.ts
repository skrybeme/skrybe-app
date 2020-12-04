import { IIdentifiable, ITree, ITreeNodeProps, ITreeProps } from '@/interfaces';
import { Maybe, UuidType } from '@/common/types';

class TreeMap<T> extends Map<UuidType, ITreeNodeProps<T>> {
  static toNativeMap<T>(map: TreeMap<T>): Map<UuidType, T> {
    const out = new Map<UuidType, T>();

    map.forEach((value: ITreeNodeProps<T>, key: UuidType) => {
      out.set(key, value.node);
    });

    return out;
  }
}

class Tree<T extends IIdentifiable> implements ITree<T> {
  protected constructor(
    protected _tree: TreeMap<T> = new TreeMap<T>()
  ) {}

  static create<T extends IIdentifiable>(props?: ITreeProps): Tree<T> {
    return new Tree<T>();
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

    this._tree.forEach((value: ITreeNodeProps<T>, key: UuidType) => {
      if (value.isRoot) {
        out = value;

        return;
      }
    });

    return out;
  }

  getSubtreeById(id: UuidType): Maybe<ITree<T>> {
    return null;
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
        parentId: 0,
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
  }
}

export default Tree;
