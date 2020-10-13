import IRepo from './IRepo';
import ITreeNode from './ITreeNode';

interface IStoryTreeNodeRepo extends IRepo {
  add(node: ITreeNode, parent: ITreeNode, position: number): ITreeNode;
  remove(node: ITreeNode): ITreeNode;
  save(node: ITreeNode): ITreeNode;
}

export default IStoryTreeNodeRepo;
