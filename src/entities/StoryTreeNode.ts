import { IStoryCard, ITree, ITreeNode } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/helpers';

class StoryTreeNode implements ITreeNode {
  constructor(
    protected _storyTree: ITree,
    protected _storyCard: IStoryCard,
    public parentId: UuidType = 0,
    public childrenIds: Array<UuidType> = [],
    public id: UuidType = generateUuid()
  ) {}

  public addChild(node: ITreeNode): ITreeNode {
    if (this.childrenIds.indexOf(node.id) > -1) {
      throw Error(`Tree node cannot have the same child added twice.`);
    }

    this.childrenIds.push(node.id);

    return this;
  }

  public getChildren(): Array<ITreeNode | UuidType> {
    const tree = this._storyTree.getAllNodes();

    return this.childrenIds.map(id => tree.get(id) || 1);
  }

  public getStoryCard(): IStoryCard {
    return this._storyCard;
  }

  public getTree(): ITree {
    return this._storyTree;
  }
}

export default StoryTreeNode;
