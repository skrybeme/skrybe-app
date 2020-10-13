import { ITree, ITreeNode, IStoryCard } from '@/interfaces';
import { Maybe, UuidType } from '@/common/types';
import { crawl } from './Crawler';
import StoryTreeNode from './StoryTreeNode';

class StoryTree implements ITree {
  constructor(private _tree: Map<UuidType, ITreeNode> = new Map()) {}

  public findById(id: UuidType): Maybe<ITreeNode> {
    return this._tree.get(id) || null;
  }

  public getAllNodes(): Map<UuidType, ITreeNode> {
    return this._tree;
  }

  public getChildrenOf(node: ITreeNode): Array<ITreeNode> {
    const ids = node.getChildrenIds();

    return ids.map(id => this._tree.get(id)!);
  }

  public getRoot(): Maybe<ITreeNode> {
    if (!this._tree.size) {
      return null;
    }

    return this._tree.get('root') || null;
  }

  public insert(
    node: ITreeNode,
    parentNode?: ITreeNode,
    placeBefore?: ITreeNode
  ): Maybe<ITreeNode> {
    if (this._tree.size === 0) {
      this._tree.set('root', node);

      return node;
    }

    this._tree.set(node.id, node);

    if (!parentNode) {
      this.getRoot()!.addChild(node);
      // @TODO
      // Refactor next line.
    } else if (!this._tree.has(parentNode.id) && this.getRoot()!.id !== parentNode.id) {
      throw new Error(`Given parent is not an node in the story tree.`);
    } else {
      parentNode.addChild(node, placeBefore);
    }

    return node;
  }

  public makeNode(storyCard: IStoryCard): ITreeNode {
    return new StoryTreeNode(this, storyCard);
  }

  public remove(node: ITreeNode): ITreeNode {
    if (!this._tree.has(node.id)) {
      throw new Error(`Given node does not exist in the story tree.`);
    }

    crawl<ITreeNode>(node, (item: ITreeNode) => item).forEach(item => {
      this._tree.delete(item.id);
    });

    return node;
  }
}

export default StoryTree;
