import {
  GenerateChildrenTreeNodesUseCase
} from '@/use-cases/GenerateChildrenTreeNodesUseCase';
import { GetCardByIdUseCase } from '@/use-cases/GetCardByIdUseCase';
import { GetTagsByTreeUseCase } from '@/use-cases/GetTagsByTreeUseCase';
import { GetTreeByIdUseCase } from '@/use-cases/GetTreeByIdUseCase';
import { InsertTreeNodeUseCase } from '@/use-cases/InsertTreeNodeUseCase';
import { RebindTreeNodeUseCase } from '@/use-cases/RebindTreeNodeUseCase';
import { RemoveTreeNodeUseCase } from '@/use-cases/RemoveTreeNodeUseCase';
import { UpdateCardDetailsUseCase } from '@/use-cases/UpdateCardDetailsUseCase';

export default interface IUseCases {
  generateChildrenTreeNodes: GenerateChildrenTreeNodesUseCase;
  getCardById: GetCardByIdUseCase;
  getTagsByTree: GetTagsByTreeUseCase;
  getTreeById: GetTreeByIdUseCase;
  insertTreeNode: InsertTreeNodeUseCase;
  rebindTreeNode: RebindTreeNodeUseCase;
  removeTreeNode: RemoveTreeNodeUseCase;
  updateCardDetails: UpdateCardDetailsUseCase;
}
