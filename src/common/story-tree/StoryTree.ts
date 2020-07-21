import { ITree, ITreeNode } from '@/interfaces';
import { UuidType } from '@/common/types';

class StoryTree implements ITree {
  public find(node: ITreeNode): ITreeNode | null {
    return null;
  }

  public findById(id: UuidType): ITreeNode | null {
    return null;
  }

  public insert(node: ITreeNode, parent: ITreeNode | UuidType): boolean {
    return true;
  }

  public remove(node: ITreeNode): boolean {
    return true;
  }

  public removeById(id: UuidType): boolean {
    return true;
  }
}

export default StoryTree;
