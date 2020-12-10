import { AsyncMaybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import {
  GenerateChildrenTreeNodesRequest,
  GetTreeByIdRequest,
  InsertTreeNodeRequest,
  RebindTreeNodeRequest,
  RemoveTreeNodeRequest
} from './requests';

export default interface IStoryTreeUseCases {
  generateChildrenTreeNodes(
    request: GenerateChildrenTreeNodesRequest
  ): AsyncMaybe<Array<StoryCard>>;
  getTreeById(request: GetTreeByIdRequest): AsyncMaybe<Tree<StoryCard>>;
  insertTreeNode(request: InsertTreeNodeRequest): AsyncMaybe<StoryCard>;
  rebindTreeNode(request: RebindTreeNodeRequest): AsyncMaybe<StoryCard>;
  removeTreeNode(request: RemoveTreeNodeRequest): AsyncMaybe<StoryCard>;
}
