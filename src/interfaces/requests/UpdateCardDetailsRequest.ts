import { UuidType } from '@/common/types';

export default interface UpdateCardDetailsRequest {
  body?: string;
  header?: string;
  id: UuidType;
  tags?: UuidType[];
  treeId: UuidType;
}
