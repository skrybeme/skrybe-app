import { UuidType } from '@/common/types';

interface ITag {
  id: UuidType | null; // for development purposes only
  color: string;
  label: String;
};

export default ITag;
