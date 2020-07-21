import { UuidType } from '@/common/types';

interface ITreeNode {
  id: UuidType;
  childrenIds: Array<UuidType>;
  parentId: UuidType;
};

export default ITreeNode;
