import { UuidType } from '@/common/types';

interface ITreeNode {
  readonly id: UuidType;
  parentId: UuidType;

  addChild(node: ITreeNode): ITreeNode;
  getChildren(): Array<ITreeNode | UuidType>;
};

export default ITreeNode;
