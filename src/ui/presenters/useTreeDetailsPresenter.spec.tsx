import React from 'react';
import { useTreeDetailsPresenter } from './useTreeDetailsPresenter';
import { act, renderHook } from '@testing-library/react-hooks';
import { ContainerProvider } from '../providers';
import { container, mocks } from '@/container/mock';
import { root, rootChild, tree } from './dummyData';

const Wrapper = ({ children }) => (
  <ContainerProvider container={container}>
    {children}
  </ContainerProvider>
)

describe(`useTreeDetailsPresenter`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`accessing tree details data on mount`, () => {
    it(
      `returns loadable state on mount`,
      () => {
        const { result } = renderHook(useTreeDetailsPresenter, {
          wrapper: Wrapper,
        });

        expect(result.current.root).toEqual({
          data: null,
          isError: false,
          isLoading: false
        });
      }
    );
  });
  
  describe(`triggerGetTreeById`, () => {
    describe(`happy path`, () => {
      mocks.getTreeByIdUseCaseExecutionMock.mockReturnValue(Promise.resolve(tree));

      it(
        `executes an use case, changes tree details loading state and eventually updates tree details data`,
        async () => {
          const { result, waitFor } = renderHook(useTreeDetailsPresenter, {
            wrapper: Wrapper,
          });

          act(() => {
            result.current.triggerGetTreeById('test-id');
          });

          expect(result.current.root).toEqual({
            data: null,
            isError: false,
            isLoading: true,
          });

          await waitFor(() => {
            expect(mocks.getTreeByIdUseCaseExecutionMock).toBeCalledWith({
              id: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
            });
          })

          await waitFor(() => {
            expect(result.current.root).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(result.current.root).toEqual({
            data: {
              body: root.body,
              children: [
                {
                  body: rootChild.body,
                  children: [],
                  header: rootChild.header,
                  id: rootChild.id,
                  parentId: root.id,
                  tags: rootChild.tags.map(({ color, id, label }) => ({
                    color,
                    id,
                    label,
                  }))
                }
              ],
              header: root.header,
              id: root.id,
              parentId: null,
              tags: []
            },
            isError: false,
            isLoading: false,
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });

  describe(`generateChildrenTreeNodes`, () => {
    describe(`happy path`, () => {
      mocks.generateChildrenTreeNodesUseCaseExecutionMock.mockReturnValue(
        Promise.resolve(tree)
      );

      it(
        `executes an use case, changes tree details loading state and eventually updates tree details data`,
        async () => {
          const { result, waitFor } = renderHook(useTreeDetailsPresenter, {
            wrapper: Wrapper,
          });

          act(() => {
            result.current.generateChildrenTreeNodes('body', rootChild.id);
          });

          expect(mocks.generateChildrenTreeNodesUseCaseExecutionMock).toBeCalledWith({
            parentNodeId: rootChild.id,
            placeBeforeNodeId: undefined,
            source: 'body',
            treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002',
          });

          await waitFor(() => {
            expect(result.current.root).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(mocks.getTreeByIdUseCaseExecutionMock).toBeCalledWith({
            id: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });

  describe(`insertTreeNode`, () => {
    describe(`happy path`, () => {
      mocks.insertTreeNodeUseCaseExecutionMock.mockReturnValue(
        Promise.resolve(tree)
      );

      it(
        `executes an use case, changes tree details loading state and eventually updates tree details data`,
        async () => {
          const { result, waitFor } = renderHook(useTreeDetailsPresenter, {
            wrapper: Wrapper
          });

          act(() => {
            result.current.insertTreeNode(root.id, {
              afterOrBefore: 'before',
              nodeId: rootChild.id
            });
          });

          expect(mocks.insertTreeNodeUseCaseExecutionMock).toBeCalledWith({
            body: '',
            header: '',
            parentNodeId: root.id,
            place: {
              afterOrBefore: 'before',
              nodeId: rootChild.id
            },
            tags: [],
            treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });

          await waitFor(() => {
            expect(result.current.root).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(mocks.getTreeByIdUseCaseExecutionMock).toBeCalledWith({
            id: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });

  describe(`removeTreeNode`, () => {
    describe(`happy path`, () => {
      mocks.removeTreeNodeUseCaseExecutionMock.mockReturnValue(
        Promise.resolve(tree)
      );

      it(
        `executes an use case, changes tree details loading state and eventually updates tree details data`,
        async () => {
          const { result, waitFor } = renderHook(useTreeDetailsPresenter, {
            wrapper: Wrapper
          });

          act(() => {
            result.current.removeTreeNode(rootChild.id);
          });

          expect(mocks.removeTreeNodeUseCaseExecutionMock).toBeCalledWith({
            id: rootChild.id,
            treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });

          await waitFor(() => {
            expect(result.current.root).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(mocks.getTreeByIdUseCaseExecutionMock).toBeCalledWith({
            id: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });

  describe(`updateTreeNode`, () => {
    describe(`happy path`, () => {
      mocks.updateTreeNodeUseCaseExecutionMock.mockReturnValue(
        Promise.resolve(tree)
      );

      it(
        `executes an use case, changes tree details loading state and eventually updates tree details data`,
        async () => {
          const { result, waitFor } = renderHook(useTreeDetailsPresenter, {
            wrapper: Wrapper
          });

          act(() => {
            result.current.updateTreeNode(rootChild.id, {
              header: root.header,
              tags: ['fake-tag-id-1', 'fake-tag-id-2']
            });
          });

          expect(mocks.updateTreeNodeUseCaseExecutionMock).toBeCalledWith({
            header: root.header,
            id: rootChild.id,
            tags: ['fake-tag-id-1', 'fake-tag-id-2'],
            treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });

          await waitFor(() => {
            expect(result.current.root).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(mocks.getTreeByIdUseCaseExecutionMock).toBeCalledWith({
            id: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });
});
