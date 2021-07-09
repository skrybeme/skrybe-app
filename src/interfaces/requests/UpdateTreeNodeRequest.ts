import { UuidType } from '@/common/types';

export default interface UpdateTreeNodeRequest {
  body?: string;
  header?: string;
  id: UuidType;
  tags?: UuidType[];
  treeId: UuidType;
}
