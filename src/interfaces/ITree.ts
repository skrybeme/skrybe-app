import IIdentifiable from './IIdentifiable';
import ITreeNodeContext from './ITreeNodeContext';
import { Maybe, UuidType } from '@/common/types';

interface ITree<T extends IIdentifiable, M> extends IIdentifiable {
  equals(tree: ITree<T, M>): boolean;
  getAllNodes(): Map<UuidType, T>;
  getChildrenOf(id: UuidType): Maybe<Array<T>>;
  getNodeContextChildrenOf(id: UuidType): Maybe<Array<ITreeNodeContext<T>>>;
  getNodeById(id: UuidType): Maybe<T>;
  getNodeContextById(id: UuidType): Maybe<ITreeNodeContext<T>>;
  getParentOf(id: UuidType): Maybe<T>;
  getRawTreeMap(): M;
  getRoot(): Maybe<T>;
  getRootContext(): Maybe<ITreeNodeContext<T>>;
  getSubtreeById(id: UuidType): Maybe<ITree<T, M>>;
  insert(
    node: T,
    parentNodeId?: UuidType,
    place?: {
      afterOrBefore: 'after' | 'before';
      nodeId: UuidType;
    }
  ): void;
  removeById(id: UuidType): void;
};

export default ITree;
