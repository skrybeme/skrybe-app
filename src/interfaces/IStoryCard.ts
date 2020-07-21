import ITag from './ITag';
import { UuidType } from '@/common/types';

interface IStoryCard {
  id: UuidType;
  header: string;
  body: string;
  tags: Array<ITag>;
};

export default IStoryCard;
