import TagViewModel from './TagViewModel';

export default interface StoryCardViewModel {
  body: string;
  header: string;
  id: string;
  tags: TagViewModel[];
}
