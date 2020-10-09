import { IStoryCard, ITree, ITreeNode } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/utils';

class StoryTreeNode implements ITreeNode {
  constructor(
    protected _storyTree: ITree,
    protected _storyCard: IStoryCard,
    public parentId: UuidType = 0,
    public childrenIds: Array<UuidType> = [],
    public id: UuidType = generateUuid()
  ) {}

  public addChild(node: ITreeNode, placeBefore?: ITreeNode): ITreeNode {
    if (this.childrenIds.indexOf(node.id) > -1) {
      throw Error(`Tree node cannot have the same child added twice.`);
    }

    node.parentId = this.id;

    if (!placeBefore) {
      this.childrenIds.push(node.id);
    } else {
      const placeIndex = this.childrenIds.indexOf(placeBefore.id);

      this.childrenIds.splice(placeIndex, 0, node.id);
    }

    return this;
  }

  public getChildrenIds(): Array<UuidType> {
    return this.childrenIds
  }

  public getStoryCard(): IStoryCard {
    return this._storyCard;
  }

  public getTree(): ITree {
    return this._storyTree;
  }
}

export default StoryTreeNode;
