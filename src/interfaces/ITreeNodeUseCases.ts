import ITreeNode from './ITreeNode';

export default interface ITreeNodeUseCases {
  rebindTreeNode(node: ITreeNode, parent: ITreeNode, position: number): ITreeNode;
}
