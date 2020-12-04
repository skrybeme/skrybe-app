import { UuidType } from '@/common/types';

interface ITreeNodeProps<T> {
  isRoot: boolean;
  node: T;
  parentId: UuidType;
  childrenIds: Array<UuidType>;
}

export default ITreeNodeProps;
