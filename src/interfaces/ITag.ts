import { UuidType } from '@/common/types';
import { TagColor } from '@/entities/enums';

interface ITag {
  id: UuidType;
  color: TagColor;
  label: string;
};

export default ITag;
