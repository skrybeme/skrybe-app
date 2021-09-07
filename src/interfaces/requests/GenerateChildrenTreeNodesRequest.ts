import { UuidType } from '@/common/types';

export default interface GenerateChildrenTreeNodesRequest {
  parentNodeId: UuidType;
  placeBeforeNodeId?: UuidType;
  source: 'body' | 'header';
  treeId: UuidType;
}
