import { UuidType } from '@/common/types';
import TagViewModel from './TagViewModel';

export default interface StoryTreeViewModel {
  id: UuidType;
  header: string;
  body: string;
  tags: Array<TagViewModel>;
  children: Array<StoryTreeViewModel>;
}
