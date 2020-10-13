import ITreeNode from './ITreeNode';
import { Maybe, UuidType } from '@/common/types';

interface ITree {
  findById(id: UuidType): ITreeNode | null;
  getAllNodes(): Map<UuidType, ITreeNode>;
  getChildrenOf(node: ITreeNode): Array<ITreeNode>;
  getRoot(): ITreeNode | null;
  insert(
    node: ITreeNode,
    parentNode?: ITreeNode,
    placeBefore?: ITreeNode
  ): Maybe<ITreeNode>;
  remove(node: ITreeNode | UuidType): ITreeNode;
};

export default ITree;
