import { UuidType } from '@/common/types';

export default interface UpdateTreeNodeRequest {
  header?: string;
  id: UuidType;
  treeId: UuidType;
}
