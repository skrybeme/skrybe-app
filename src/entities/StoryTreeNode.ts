import { IStoryCard, ITag, ITreeNode, ITree } from '@/interfaces';
import { UuidType } from '@/common/types';
import { generateUuid } from '@/helpers';

class StoryTreeNode implements ITreeNode {
  public id: UuidType;
  public childrenIds: Array<UuidType>;
  public parentId: UuidType;
  protected _storyCard: IStoryCard;
  protected _storyTree: ITree;

  constructor(storyTree: ITree, storyCard: IStoryCard) {
    this.id = generateUuid();
    this.childrenIds = [];
    this.parentId = 0;
    this._storyCard = storyCard;
    this._storyTree = storyTree;
  }

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
