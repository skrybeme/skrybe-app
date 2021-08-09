import {
  LocalStorageStoryTreeDataSource
} from '@/data-sources/localstorage/LocalStorageStoryTreeDataSource';
import { IStoryTreeDataSource, IStoryTreeRepo, ITagRepo, IUseCases } from '@/interfaces';
import { TagRepo } from '@/repository';
import createStoryTreeRepo from '@/repository/StoryTreeRepo';
import { CardDetailsStore } from '@/store';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import {
  GenerateChildrenTreeNodesUseCase
} from '@/use-cases/GenerateChildrenTreeNodesUseCase';
import { GetCardByIdUseCase } from '@/use-cases/GetCardByIdUseCase';
import { GetTagsByTreeUseCase } from '@/use-cases/GetTagsByTreeUseCase';
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
    const tagsRepo = container.get<ITagRepo>(SYMBOL.TagRepo);
    const treeRepo = container.get<IStoryTreeRepo>(SYMBOL.TreeRepo);

    return {
      generateChildrenTreeNodes: new GenerateChildrenTreeNodesUseCase(treeRepo),
      getCardById: new GetCardByIdUseCase(treeRepo),
      getTagsByTree: new GetTagsByTreeUseCase(tagsRepo),
      getTreeById: new GetTreeByIdUseCase(treeRepo),
      insertTreeNode: new InsertTreeNodeUseCase(treeRepo),
      rebindTreeNode: new RebindTreeNodeUseCase(treeRepo),
      removeTreeNode: new RemoveTreeNodeUseCase(treeRepo),
      updateTreeNode: new UpdateTreeNodeUseCase(tagsRepo, treeRepo)
    };
  });
}));

container.load(new ContainerModule((bind) => {
  bind<IStoryTreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createStoryTreeRepo(container.get<IStoryTreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule((bind) => {
  const tagRepo: ITagRepo = new TagRepo();

  bind<ITagRepo>(SYMBOL.TagRepo).toConstantValue(tagRepo);
}));

container.load(new ContainerModule((bind) => {
  const mockTreeDataSource: IStoryTreeDataSource = new LocalStorageStoryTreeDataSource();

  mockTreeDataSource.boot();

  bind<IStoryTreeDataSource>(SYMBOL.TreeDataSource)
    .toConstantValue(mockTreeDataSource);
}));

container.load(new ContainerModule((bind) => {
  bind<CardDetailsStore>(SYMBOL.store.CardDetailsStore);
  bind<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore);
}));

export { container }
