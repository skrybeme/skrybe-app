import {
  GenerateChildrenTreeNodesUseCase
} from '@/use-cases/GenerateChildrenTreeNodesUseCase';
import { GetCardByIdUseCase } from '@/use-cases/GetCardByIdUseCase';
import { GetStoryTreeInfoCollectionUseCase } from '@/use-cases/GetStoryTreeInfoCollectionUseCase';
import { GetTagsByTreeUseCase } from '@/use-cases/GetTagsByTreeUseCase';
import { GetTreeUseCase } from '@/use-cases/GetTreeUseCase';
import { InsertTreeNodeUseCase } from '@/use-cases/InsertTreeNodeUseCase';
import { RebindTreeNodeUseCase } from '@/use-cases/RebindTreeNodeUseCase';
import { RemoveTreeNodeUseCase } from '@/use-cases/RemoveTreeNodeUseCase';
import { UpdateCardDetailsUseCase } from '@/use-cases/UpdateCardDetailsUseCase';

export default interface IUseCases {
  generateChildrenTreeNodes: GenerateChildrenTreeNodesUseCase;
  getCardById: GetCardByIdUseCase;
  getStoryTreeInfoCollection: GetStoryTreeInfoCollectionUseCase;
  getTagsByTree: GetTagsByTreeUseCase;
  getTree: GetTreeUseCase;
  insertTreeNode: InsertTreeNodeUseCase;
  rebindTreeNode: RebindTreeNodeUseCase;
  removeTreeNode: RemoveTreeNodeUseCase;
  updateCardDetails: UpdateCardDetailsUseCase;
}
