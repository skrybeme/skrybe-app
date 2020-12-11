import { UuidType } from '@/common/types';
import { TagColor } from '@/entities/enums';

export default interface InsertTreeNodeRequest {
  body: string;
  header: string;
  parentNodeId: UuidType;
  placeBeforeNodeId?: UuidType;
  tags: Array<{
    color?: TagColor;
    label?: string;
  }>;
  treeId: UuidType;
}
