import { AsyncMaybe } from '@/common/types';
import { GetTreeByIdRequest, RebindTreeNodeRequest } from './requests';

export default interface IStoryTreeUseCases<T, N> {
  getTreeById(request: GetTreeByIdRequest): AsyncMaybe<T>;
  rebindTreeNode(request: RebindTreeNodeRequest): Promise<N>;
}
