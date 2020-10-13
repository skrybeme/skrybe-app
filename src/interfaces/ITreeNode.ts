import { UuidType } from '@/common/types';
import IStoryCard from './IStoryCard';
import ITree from './ITree';

interface ITreeNode {
  readonly id: UuidType;
  parentId: UuidType;

  addChild(node: ITreeNode, placeBefore?: ITreeNode): ITreeNode;
  getChildrenIds(): Array<UuidType>;
  getStoryCard(): IStoryCard;
  getTree(): ITree;
};

export default ITreeNode;
