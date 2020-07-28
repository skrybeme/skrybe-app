import { UuidType } from '@/common/types';
import ITree from './ITree';

interface ITreeNode {
  readonly id: UuidType;
  parentId: UuidType;

  addChild(node: ITreeNode): ITreeNode;
  getChildren(): Array<ITreeNode | UuidType>;
  getTree(): ITree;
};

export default ITreeNode;
