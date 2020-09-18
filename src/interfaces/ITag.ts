import { UuidType } from '@/common/types';
import { ColorType } from '@/entities/types';

interface ITag {
  id: UuidType;
  color: ColorType;
  label: String;
};

export default ITag;
