import { TagLocalStorageModel } from './TagLocalStorageModel';

export interface StoryCardLocalStorageModel {
  body: string;
  header: string;
  id: string;
  tags: Array<TagLocalStorageModel>;
}
