import { UuidType } from '@/common/types';

interface INestedStoryCard {
  readonly id: UuidType;
  header: string;
  body: string;
  tags: Array<any>;
  subcards: Array<INestedStoryCard>;
};

export default INestedStoryCard;
