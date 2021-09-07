import { StoryCardLocalStorageModel } from './StoryCardLocalStorageModel';

export interface StoryTreeLocalStorageModel {
  id: string;
  infoId: string;
  tree: {
    [id: string]: {
      isRoot: boolean;
      node: StoryCardLocalStorageModel;
      parentId: string;
      childrenIds: Array<string>;
    }
  };
}
