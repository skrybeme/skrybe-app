import { UuidType } from '@/common/types';

export default interface RemoveTreeNodeRequest {
  id: UuidType;
  treeId: UuidType;
}
