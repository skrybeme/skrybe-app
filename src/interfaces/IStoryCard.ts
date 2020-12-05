import ITag from './ITag';
import { UuidType } from '@/common/types';

interface IStoryCard {
  body: string;
  header: string;
  tags: Array<ITag>;

  addTag(tag: ITag): IStoryCard;
  removeTagById(id: UuidType): IStoryCard;
  replaceTag(oldTagId: UuidType, newTag: ITag): IStoryCard;
};

export default IStoryCard;
