import { Maybe, UuidType } from '@/common/types';
import TagViewModel from './TagViewModel';

export default interface StoryTreeViewModel {
  body: string;
  children: Array<StoryTreeViewModel>;
  header: string;
  id: UuidType;
  parentId: Maybe<UuidType>;
  tags: Array<TagViewModel>;
}
