import { UuidType } from '@/common/types';

export default interface RebindTreeNodeRequest {
  treeId: UuidType,
  nodeId: UuidType,
  parentNodeId: UuidType,
  placeBeforeNodeId?: UuidType
}
