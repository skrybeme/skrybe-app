import { IStoryCard, ITag, ITreeNode } from '@/interfaces';
import { UuidType } from '@/common/types';

class StoryTreeNode implements ITreeNode, IStoryCard {
  public id: UuidType;
  public childrenIds: Array<UuidType>;
  public parentId: UuidType;
  public header: string;
  public body: string;
  public tags: Array<ITag>;

  constructor() {
    this.id = null;
    this.childrenIds = [];
    this.parentId = null;
    this.header = '';
    this.body = '';
    this.tags = [];
  }
}

export default StoryTreeNode;
