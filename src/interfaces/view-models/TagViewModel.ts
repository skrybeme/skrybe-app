import { UuidType } from '@/common/types';
import { TagColor } from '@/entities/enums';

export default interface TagViewModel {
  id: UuidType;
  color: TagColor;
  label: String;
};
