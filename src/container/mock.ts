import { PartialProps } from '@/common/types';
import { IUseCases } from '@/interfaces';
import { CardDetailsStore } from '@/store';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { TagCollectionStore } from '@/store/TagCollectionStore';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';
import { ESLSubscriptionStore } from '@/store/ESLSubscriptionStore';
import { ISignToESLUseCase } from '@/use-cases/sign-to-esl/SignToESLUseCase';

const container = new Container();

const mocks = {
  generateChildrenTreeNodesUseCaseExecutionMock: jest.fn(),
  getCardByIdUseCaseExecutionMock: jest.fn(),
  getStoryTreeInfoCollectionUseCaseExecutionMock: jest.fn(),
  getTagsByTreeUseCaseExecutionMock: jest.fn(),
  getTreeUseCaseExecutionMock: jest.fn(),
  insertTreeNodeUseCaseExecutionMock: jest.fn(),
  rebindTreeNodeUseCaseExecutionMock: jest.fn(),
  removeTreeNodeUseCaseExecutionMock: jest.fn(),
  signToESLUseCaseExecutionMock: jest.fn(),
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
      getTree: { execute: mocks.getTreeUseCaseExecutionMock },
      insertTreeNode: { execute: mocks.insertTreeNodeUseCaseExecutionMock },
      rebindTreeNode: { execute: mocks.rebindTreeNodeUseCaseExecutionMock },
      removeTreeNode: { execute: mocks.removeTreeNodeUseCaseExecutionMock },
      signToESL: { execute: mocks.signToESLUseCaseExecutionMock },
      updateCardDetails: { execute: mocks.updateCardDetailsUseCaseExecutionMock }
    };
  });

  bind<ISignToESLUseCase>(SYMBOL.useCase.SignToESLUseCase).toDynamicValue(() => {
    return { execute: mocks.signToESLUseCaseExecutionMock };
  });
}));

container.load(new ContainerModule((bind) => {
  bind<CardDetailsStore>(SYMBOL.store.CardDetailsStore)
    .toConstantValue(new CardDetailsStore());

  bind<ESLSubscriptionStore>(SYMBOL.store.ESLSubscriptionStore)
    .to(ESLSubscriptionStore).inSingletonScope();

  bind<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore)
    .toConstantValue(new StoryTreeRootDetailsStore());

  bind<TagCollectionStore>(SYMBOL.store.TagCollectionStore)
    .toConstantValue(new TagCollectionStore());
}));

export {
  container,
  mocks
}
