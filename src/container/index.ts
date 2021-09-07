import 'reflect-metadata';
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
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';
import { ITagCollectionStore, TagCollectionStore } from '@/store/TagCollectionStore';
import { UpdateCardDetailsUseCase } from '@/use-cases/UpdateCardDetailsUseCase';

const container = new Container();

container.load(new ContainerModule((bind) => {
  bind<CardDetailsStore>(SYMBOL.store.CardDetailsStore)
    .toConstantValue(new CardDetailsStore());

  bind<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore)
    .toConstantValue(new StoryTreeRootDetailsStore());

  bind<ITagCollectionStore>(SYMBOL.store.TagCollectionStore)
    .toConstantValue(new TagCollectionStore());
}));

container.load(new ContainerModule((bind) => {
  bind<IUseCases>(SYMBOL.UseCases).toDynamicValue(({ container }) => {
    const cardDetailsStore
      = container.get<CardDetailsStore>(SYMBOL.store.CardDetailsStore);

    const storyTreeRootDetailsStore
      = container.get<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore);

    const tagCollectionStore
      = container.get<ITagCollectionStore>(SYMBOL.store.TagCollectionStore);

    const tagsRepo = container.get<ITagRepo>(SYMBOL.TagRepo);

    const treeRepo = container.get<IStoryTreeRepo>(SYMBOL.TreeRepo);

    return {
      generateChildrenTreeNodes:
        new GenerateChildrenTreeNodesUseCase(treeRepo, storyTreeRootDetailsStore),
      getCardById: new GetCardByIdUseCase(treeRepo, cardDetailsStore),
      getTagsByTree: new GetTagsByTreeUseCase(tagsRepo, tagCollectionStore),
      getTreeById: new GetTreeByIdUseCase(treeRepo, storyTreeRootDetailsStore),
      insertTreeNode: new InsertTreeNodeUseCase(treeRepo, storyTreeRootDetailsStore),
      rebindTreeNode: new RebindTreeNodeUseCase(treeRepo, storyTreeRootDetailsStore),
      removeTreeNode: new RemoveTreeNodeUseCase(treeRepo, storyTreeRootDetailsStore),
      updateCardDetails: new UpdateCardDetailsUseCase(
        tagsRepo,
        treeRepo,
        storyTreeRootDetailsStore,
        cardDetailsStore,
      )
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

export { container }
