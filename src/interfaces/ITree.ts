import ITreeNode from './ITreeNode';
import { UuidType } from '@/common/types';

interface ITree {
  find(node: ITreeNode): ITreeNode | null;
  findById(id: UuidType): ITreeNode | null;
  insert(node: ITreeNode, parentNode: ITreeNode | UuidType): boolean;
  remove(node: ITreeNode): boolean;
  removeById(id: UuidType): boolean;
};

export default ITree;
