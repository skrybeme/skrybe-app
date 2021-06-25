import { GenerateChildrenTreeNodesUseCase } from '@/use-cases/GenerateChildrenTreeNodesUseCase';
import { GetCardByIdUseCase } from '@/use-cases/GetCardByIdUseCase';
import { GetTreeByIdUseCase } from '@/use-cases/GetTreeByIdUseCase';
import { InsertTreeNodeUseCase } from '@/use-cases/InsertTreeNodeUseCase';
import { RebindTreeNodeUseCase } from '@/use-cases/RebindTreeNodeUseCase';
import { RemoveTreeNodeUseCase } from '@/use-cases/RemoveTreeNodeUseCase';
import { UpdateTreeNodeUseCase } from '@/use-cases/UpdateTreeNodeUseCase';

export default interface IUseCases {
  generateChildrenTreeNodes: GenerateChildrenTreeNodesUseCase;
  getCardById: GetCardByIdUseCase;
  getTreeById: GetTreeByIdUseCase;
  insertTreeNode: InsertTreeNodeUseCase;
  rebindTreeNode: RebindTreeNodeUseCase;
  removeTreeNode: RemoveTreeNodeUseCase;
  updateTreeNode: UpdateTreeNodeUseCase;
}
