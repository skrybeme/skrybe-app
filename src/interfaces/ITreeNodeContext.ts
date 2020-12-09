import { UuidType } from '@/common/types';

interface ITreeNodeContext<T> {
  isRoot: boolean;
  node: T;
  parentId: UuidType;
  childrenIds: Array<UuidType>;
}

export default ITreeNodeContext;
