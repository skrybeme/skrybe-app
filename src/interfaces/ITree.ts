import ITreeNode from './ITreeNode';
import { Maybe, UuidType } from '@/common/types';

interface ITree {
  findById(id: UuidType): ITreeNode | null;
  getAllNodes(): Map<UuidType, ITreeNode>;
  getRoot(): ITreeNode | null;
  insert(node: ITreeNode, parentNode?: ITreeNode): Maybe<ITreeNode>;
  remove(node: ITreeNode | UuidType): ITreeNode;
};

export default ITree;
