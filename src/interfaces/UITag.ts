import { UuidType } from '@/common/types';
import { ColorType } from '@/entities/types';

export default interface UITag {
  id: UuidType;
  color: ColorType;
  label: String;
};
