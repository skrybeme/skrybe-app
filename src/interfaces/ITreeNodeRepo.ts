import IRepo from './IRepo';
import ITreeNode from './ITreeNode';

export default interface ITreeNodeRepo extends IRepo {
  add(treeNode: ITreeNode, parentTreeNode: ITreeNode, position: number): ITreeNode;
  remove(treeNode: ITreeNode): ITreeNode;
}
