import React from 'react';
import { container, mocks } from '@/container/mock';
import { ContainerProvider } from '../providers';
import { act, renderHook } from '@testing-library/react-hooks';
import { useCardDetailsPresenter } from './useCardDetailsPresenter';
import { rootChild } from './dummyData';

const Wrapper = ({ children }) => (
  <ContainerProvider container={container}>
    {children}
  </ContainerProvider>
)

describe(`useCardDetailsPresneter`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`accessing card details data on mount`, () => {
    it(`returns loadable state on mount`, () => {
      const { result } = renderHook(() => useCardDetailsPresenter({ cardId: 'card-test-id' }), {
        wrapper: Wrapper,
      });

      expect(result.current.card).toEqual({
        data: null,
        isError: false,
        isLoading: false
      });
    });
  });

  describe(`triggerGetCardById`, () => {
    describe(`happy path`, () => {
      mocks.getCardByIdUseCaseExecutionMock.mockReturnValue(Promise.resolve(rootChild));

      it(
        `executes an use case, changes card details loading state and eventually updates card details data`,
        async () => {
          const { result, waitFor } = renderHook(() => useCardDetailsPresenter({ cardId: 'card-test-id' }), {
            wrapper: Wrapper,
          });

          act(() => {
            result.current.triggerGetCardById('test-id');
          });

          expect(result.current.card).toEqual({
            data: null,
            isError: false,
            isLoading: true,
          });

          await waitFor(() => {
            expect(mocks.getCardByIdUseCaseExecutionMock).toBeCalledWith({
              id: 'card-test-id',
              treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
            });
          })

          await waitFor(() => {
            expect(result.current.card).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(result.current.card).toEqual({
            data: {
              body: rootChild.body,
              header: rootChild.header,
              id: rootChild.id
            },
            isError: false,
            isLoading: false
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });

  describe(`updateTreeNode`, () => {
    describe(`happy path`, () => {
      mocks.updateTreeNodeUseCaseExecutionMock.mockReturnValue(
        Promise.resolve(rootChild)
      );

      it(`executes an use case, changes card details loading state and eventually updates card details data`, async () => {
        const { result, waitFor } = renderHook(() => useCardDetailsPresenter({ cardId: rootChild.id }), {
          wrapper: Wrapper
        });

        act(() => {
          result.current.updateTreeNode('c0773e64-3a3a-11eb-adc1-0242ac120002', rootChild.id, {
            body: 'updated body',
            header: 'updated header'
          });
        });

        expect(mocks.updateTreeNodeUseCaseExecutionMock).toBeCalledWith({
          body: 'updated body',
          header: 'updated header',
          id: rootChild.id,
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        });

        await waitFor(() => {
          expect(result.current.card).toEqual(expect.objectContaining({
            isLoading: false
          }));
        });

        expect(mocks.getCardByIdUseCaseExecutionMock).toBeCalledWith({
          id: rootChild.id,
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        });
      });
    });

    it.todo(`errors and invalid data`);
  });
});
