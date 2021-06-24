import { PartialProps } from '@/common/types';
import { IUseCases } from '@/interfaces';
import { Container, ContainerModule } from 'inversify';
import * as SYMBOL from './symbols';

const container = new Container();

const mocks = {
  generateChildrenTreeNodesUseCaseExecutionMock: jest.fn(),
  getTreeByIdUseCaseExecutionMock: jest.fn(),
  insertTreeNodeUseCaseExecutionMock: jest.fn(),
  rebindTreeNodeUseCaseExecutionMock: jest.fn(),
  removeTreeNodeUseCaseExecutionMock: jest.fn(),
  updateTreeNodeUseCaseExecutionMock: jest.fn()
};

container.load(new ContainerModule((bind) => {
  bind<PartialProps<IUseCases>>(SYMBOL.UseCases).toDynamicValue(() => {
    return {
      generateChildrenTreeNodes: {
        execute: mocks.generateChildrenTreeNodesUseCaseExecutionMock
      },
      getTreeById: { execute: mocks.getTreeByIdUseCaseExecutionMock },
      insertTreeNode: { execute: mocks.insertTreeNodeUseCaseExecutionMock },
      rebindTreeNode: { execute: mocks.rebindTreeNodeUseCaseExecutionMock },
      removeTreeNode: { execute: mocks.removeTreeNodeUseCaseExecutionMock },
      updateTreeNode: { execute: mocks.updateTreeNodeUseCaseExecutionMock }
    };
  });
}));

export {
  container,
  mocks
}
