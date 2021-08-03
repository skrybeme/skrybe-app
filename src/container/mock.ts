import { PartialProps } from '@/common/types';
import { IUseCases } from '@/interfaces';
import { CardDetailsStore } from '@/store';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { TagCollectionStore } from '@/store/TagCollectionStore';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

const mocks = {
  generateChildrenTreeNodesUseCaseExecutionMock: jest.fn(),
  getCardByIdUseCaseExecutionMock: jest.fn(),
  getStoryTreeInfoCollectionUseCaseExecutionMock: jest.fn(),
  getTagsByTreeUseCaseExecutionMock: jest.fn(),
  getTreeByIdUseCaseExecutionMock: jest.fn(),
  insertTreeNodeUseCaseExecutionMock: jest.fn(),
  rebindTreeNodeUseCaseExecutionMock: jest.fn(),
  removeTreeNodeUseCaseExecutionMock: jest.fn(),
  updateCardDetailsUseCaseExecutionMock: jest.fn()
};

container.load(new ContainerModule((bind) => {
  bind<PartialProps<IUseCases>>(SYMBOL.UseCases).toDynamicValue(() => {
    return {
      generateChildrenTreeNodes: {
        execute: mocks.generateChildrenTreeNodesUseCaseExecutionMock
      },
      getCardById: { execute: mocks.getCardByIdUseCaseExecutionMock },
      getStoryTreeInfoCollection: {
        execute: mocks.getStoryTreeInfoCollectionUseCaseExecutionMock
      },
      getTagsByTree: { execute: mocks.getTagsByTreeUseCaseExecutionMock },
      getTreeById: { execute: mocks.getTreeByIdUseCaseExecutionMock },
      insertTreeNode: { execute: mocks.insertTreeNodeUseCaseExecutionMock },
      rebindTreeNode: { execute: mocks.rebindTreeNodeUseCaseExecutionMock },
      removeTreeNode: { execute: mocks.removeTreeNodeUseCaseExecutionMock },
      updateCardDetails: { execute: mocks.updateCardDetailsUseCaseExecutionMock }
    };
  });
}));

container.load(new ContainerModule((bind) => {
  bind<CardDetailsStore>(SYMBOL.store.CardDetailsStore)
    .toConstantValue(new CardDetailsStore());

  bind<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore)
    .toConstantValue(new StoryTreeRootDetailsStore());

  bind<TagCollectionStore>(SYMBOL.store.TagCollectionStore)
    .toConstantValue(new TagCollectionStore());
}));

export {
  container,
  mocks
}
