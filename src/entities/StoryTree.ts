import { ITree, ITreeNode, IStoryCard } from '@/interfaces';
import { UuidType } from '@/common/types';
import StoryTreeNode from './StoryTreeNode';

class StoryTree implements ITree {
  constructor(private _tree: Map<UuidType, ITreeNode> = new Map()) {}

  public findById(id: UuidType): ITreeNode | null {
    return this._tree.get(id) || null;
  }

  public getAllNodes(): Map<UuidType, ITreeNode> {
    return this._tree;
  }

  public getRoot(): ITreeNode | null {
    if (!this._tree.size) {
      return null;
    }

    return this._tree.get('root') || null;
  }

  public insert(node: ITreeNode, parent?: ITreeNode): boolean {
    if (this._tree.size === 0) {
      this._tree.set('root', node);

      return true;
    }

    this._tree.set(node.id, node);

    if (!parent) {
      this.getRoot()?.addChild(node);
    } else if (!this._tree.has(parent.id)) {
      throw new Error(`Given parent is not an node in the story tree.`);
    } else {
      parent.addChild(node);
    }

    return false;
  }

  public makeNode(storyCard: IStoryCard): ITreeNode {
    return new StoryTreeNode(this, storyCard);
  }

  public remove(node: ITreeNode): ITreeNode {
    if (!this._tree.has(node.id)) {
      throw new Error(`Given node does not exist in the story tree.`);
    }

    function crawl(start) {
      if (!start) {
        return [];
      }

      const children = start.getChildren();

      return [start].concat(...children.map(ch => crawl(ch)));
    }

    crawl(node).forEach(item => {
      this._tree.delete(item.id);
    });

    return node;
  }
}

export default StoryTree;
