import { AsyncMaybe } from '@/common/types';
import ITreeNode from './ITreeNode';

export default interface ITreeNodeUseCases {
  rebindTreeNode(
    node: ITreeNode,
    parent: ITreeNode,
    placeBefore: ITreeNode
  ): AsyncMaybe<ITreeNode>;
}
