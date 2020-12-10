import ITag from './ITag';
import { UuidType } from '@/common/types';
import IIdentifiable from './IIdentifiable';

interface IStoryCard extends IIdentifiable {
  body: string;
  header: string;
  tags: Array<ITag>;

  addTag(tag: ITag): IStoryCard;
  removeTagById(id: UuidType): IStoryCard;
  replaceTag(oldTagId: UuidType, newTag: ITag): IStoryCard;
};

export default IStoryCard;
