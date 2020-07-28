import ITag from './ITag';
import { UuidType } from '@/common/types';

interface IStoryCard {
  header: string;
  body: string;
  tags: Array<ITag>;

  addTag(tag: ITag): IStoryCard;
  removeTag(tag: ITag | UuidType): IStoryCard;
  replaceTag(oldTag: ITag, newTag: ITag): IStoryCard;
  setBody(body: string): IStoryCard;
  setHeader(header: string): IStoryCard;
};

export default IStoryCard;
