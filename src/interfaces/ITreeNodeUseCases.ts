import { AsyncMaybe } from '@/common/types';
import ITreeNode from './ITreeNode';

export default interface ITreeNodeUseCases {
  rebindTreeNode(
    node: ITreeNode,
    parent: ITreeNode,
    position: number
  ): AsyncMaybe<ITreeNode>;
}
