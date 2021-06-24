import {
  LocalStorageStoryTreeDataSource
} from '@/data-sources/localstorage/LocalStorageStoryTreeDataSource';
import { IStoryTreeDataSource, IStoryTreeRepo, IUseCases } from '@/interfaces';
import createStoryTreeRepo from '@/repository/StoryTreeRepo';
import {
  GenerateChildrenTreeNodesUseCase
} from '@/use-cases/GenerateChildrenTreeNodesUseCase';
import { GetTreeByIdUseCase } from '@/use-cases/GetTreeByIdUseCase';
import { InsertTreeNodeUseCase } from '@/use-cases/InsertTreeNodeUseCase';
import { RebindTreeNodeUseCase } from '@/use-cases/RebindTreeNodeUseCase';
import { RemoveTreeNodeUseCase } from '@/use-cases/RemoveTreeNodeUseCase';
import { UpdateTreeNodeUseCase } from '@/use-cases/UpdateTreeNodeUseCase';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

container.load(new ContainerModule((bind) => {
  bind<IUseCases>(SYMBOL.UseCases).toDynamicValue(({ container }) => {
    const treeRepo = container.get<IStoryTreeRepo>(SYMBOL.TreeRepo);

    return {
      generateChildrenTreeNodes: new GenerateChildrenTreeNodesUseCase(treeRepo),
      getTreeById: new GetTreeByIdUseCase(treeRepo),
      insertTreeNode: new InsertTreeNodeUseCase(treeRepo),
      rebindTreeNode: new RebindTreeNodeUseCase(treeRepo),
      removeTreeNode: new RemoveTreeNodeUseCase(treeRepo),
      updateTreeNode: new UpdateTreeNodeUseCase(treeRepo)
    };
  });
}));

container.load(new ContainerModule((bind) => {
  bind<IStoryTreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createStoryTreeRepo(container.get<IStoryTreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule((bind) => {
  const mockTreeDataSource: IStoryTreeDataSource = new LocalStorageStoryTreeDataSource();

  mockTreeDataSource.boot();

  bind<IStoryTreeDataSource>(SYMBOL.TreeDataSource)
    .toConstantValue(mockTreeDataSource);
}));

export { container }
