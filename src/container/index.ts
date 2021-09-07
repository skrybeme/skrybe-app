import 'reflect-metadata';
import {
  LocalStorageDatabase
} from '@/data-sources/localstorage/database/LocalStorageDatabase';
import {
  ILocalStorageStoryTreeRootDatabase,
  LocalStorageStoryTreeDataSource
} from '@/data-sources/localstorage/LocalStorageStoryTreeDataSource';
import {
  ILocalStorageStoryTreeInfoDatabase,
  ILocalStorageStoryTreeInfoDataSource,
  LocalStorageStoryTreeInfoDataSource
} from '@/data-sources/localstorage/LocalStorageStoryTreeInfoDataSource';
import StoryTreeInfo from '@/entities/StoryTreeInfo';
import {
  IPersistable,
  IStoryTreeDataSource,
  IStoryTreeRepo,
  ITagRepo,
  IUseCases
} from '@/interfaces';
import { TagRepo } from '@/repository';
import StoryTreeInfoRepo from '@/repository/StoryTreeInfoRepo';
import createStoryTreeRepo from '@/repository/StoryTreeRepo';
import { CardDetailsStore } from '@/store';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import {
  GenerateChildrenTreeNodesUseCase
} from '@/use-cases/GenerateChildrenTreeNodesUseCase';
import { GetCardByIdUseCase } from '@/use-cases/GetCardByIdUseCase';
import { GetStoryTreeInfoCollectionUseCase, IStoryTreeInfoRepo } from '@/use-cases/GetStoryTreeInfoCollectionUseCase';
import { GetTagsByTreeUseCase } from '@/use-cases/GetTagsByTreeUseCase';
import { InsertTreeNodeUseCase } from '@/use-cases/InsertTreeNodeUseCase';
import { RebindTreeNodeUseCase } from '@/use-cases/RebindTreeNodeUseCase';
import { RemoveTreeNodeUseCase } from '@/use-cases/RemoveTreeNodeUseCase';
import { Container, ContainerModule } from 'inversify';
import { ITagCollectionStore, TagCollectionStore } from '@/store/TagCollectionStore';
import { UpdateCardDetailsUseCase } from '@/use-cases/UpdateCardDetailsUseCase';
import { GetTreeUseCase } from '@/use-cases/GetTreeUseCase';
import { StoryTreeInfoCollectionStore } from '@/store/StoryTreeInfoCollectionStore';
import * as SYMBOL from './symbols';

const container = new Container();

container.load(new ContainerModule((bind) => {
  bind<CardDetailsStore>(SYMBOL.store.CardDetailsStore)
    .toConstantValue(new CardDetailsStore());

  bind<StoryTreeInfoCollectionStore>(SYMBOL.store.StoryTreeInfoCollectionStore)
    .toConstantValue(new StoryTreeInfoCollectionStore());

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

    const storyTreeInfoCollectionStore = container.get<StoryTreeInfoCollectionStore>(
      SYMBOL.store.StoryTreeInfoCollectionStore
    );

    const tagCollectionStore
      = container.get<ITagCollectionStore>(SYMBOL.store.TagCollectionStore);

    const storyTreeInfoRepo = container.get<IStoryTreeInfoRepo>(SYMBOL.StoryTreeInfoRepo);

    const tagsRepo = container.get<ITagRepo>(SYMBOL.TagRepo);

    const treeRepo = container.get<IStoryTreeRepo>(SYMBOL.TreeRepo);

    return {
      generateChildrenTreeNodes:
        new GenerateChildrenTreeNodesUseCase(treeRepo, storyTreeRootDetailsStore),
      getCardById: new GetCardByIdUseCase(treeRepo, cardDetailsStore),
      getStoryTreeInfoCollection: new GetStoryTreeInfoCollectionUseCase(
        storyTreeInfoRepo,
        storyTreeInfoCollectionStore
      ),
      getTagsByTree: new GetTagsByTreeUseCase(tagsRepo, tagCollectionStore),
      getTree: new GetTreeUseCase(treeRepo, storyTreeRootDetailsStore),
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
  bind<IStoryTreeInfoRepo>(SYMBOL.StoryTreeInfoRepo).toDynamicValue(({ container }) => {
    const storyTreeInfoDataSource
      = container.get<IPersistable<StoryTreeInfo>>(SYMBOL.StoryTreeInfoDataSource);

    return new StoryTreeInfoRepo(storyTreeInfoDataSource);
  })}));

container.load(new ContainerModule((bind) => {
  bind<IStoryTreeRepo>(SYMBOL.TreeRepo).toDynamicValue(({ container }) =>
    createStoryTreeRepo(container.get<IStoryTreeDataSource>(SYMBOL.TreeDataSource))
)}));

container.load(new ContainerModule((bind) => {
  const tagRepo: ITagRepo = new TagRepo();

  bind<ITagRepo>(SYMBOL.TagRepo).toConstantValue(tagRepo);
}));

container.load(new ContainerModule((bind) => {
  const localStorageDatabase = new LocalStorageDatabase();

  bind<ILocalStorageStoryTreeInfoDatabase & ILocalStorageStoryTreeRootDatabase>(
    SYMBOL.LocalStorageDatabase
  )
    .toConstantValue(localStorageDatabase);
}));

container.load(new ContainerModule((bind) => {
  bind<IStoryTreeDataSource>(SYMBOL.TreeDataSource)
    .toDynamicValue(({ container }) => {
      const db = container.get<
        ILocalStorageStoryTreeInfoDatabase & ILocalStorageStoryTreeRootDatabase
      >(SYMBOL.LocalStorageDatabase);

      const mockedStoryTreeDataSource: IStoryTreeDataSource
        = new LocalStorageStoryTreeDataSource(db);
  
      return mockedStoryTreeDataSource;
    });
}));

container.load(new ContainerModule((bind) => {
  bind<ILocalStorageStoryTreeInfoDataSource>(SYMBOL.StoryTreeInfoDataSource)
    .toDynamicValue(({ container }) => {
      const db = container.get<
        ILocalStorageStoryTreeInfoDatabase & ILocalStorageStoryTreeRootDatabase
      >(SYMBOL.LocalStorageDatabase);

      const mockedStoryTreeInfoDataSource: ILocalStorageStoryTreeInfoDataSource
        = new LocalStorageStoryTreeInfoDataSource(db);
  
      return mockedStoryTreeInfoDataSource;
    });
}));

export { container }
