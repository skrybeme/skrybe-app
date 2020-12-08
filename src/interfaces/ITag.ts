import { TagColor } from '@/entities/enums';
import IIdentifiable from './IIdentifiable';

interface ITag extends IIdentifiable {
  color: TagColor;
  label: string;
};

export default ITag;
