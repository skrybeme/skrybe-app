import IIdentifiable from './IIdentifiable';
import { Maybe, UuidType } from '@/common/types';

interface ITree<T extends IIdentifiable> {
  getAllNodes(): Map<UuidType, T>;
  getChildrenOf(id: UuidType): Maybe<Array<T>>;
  getNodeById(id: UuidType): Maybe<T>;
  getParentOf(id: UuidType): Maybe<T>;
  getRoot(): Maybe<T>;
  getSubtreeById(id: UuidType): Maybe<ITree<T>>;
  insert(
    node: T,
    parentNodeId?: UuidType,
    placeBeforeNodeId?: UuidType
  ): void;
  removeById(id: UuidType): void;
};

export default ITree;
