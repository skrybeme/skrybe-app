import React from 'react';
import { container, mocks } from '@/container/mock';
import { ContainerProvider } from '../providers';
import { act, renderHook } from '@testing-library/react-hooks';
import { tagCollection } from './dummyData';
import { useTagCollectionPresenter } from './useTagCollectionPresenter';

const Wrapper = ({ children }) => (
  <ContainerProvider container={container}>
    {children}
  </ContainerProvider>
)

describe(`useTagCollectionPresneter`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`accessing card details data on mount`, () => {
    it(`returns loadable state on mount`, () => {
      const { result } = renderHook(useTagCollectionPresenter, {
        wrapper: Wrapper,
      });

      expect(result.current.tags).toEqual({
        data: null,
        isError: false,
        isLoading: false
      });
    });
  });

  describe(`triggerGetTagsByTree`, () => {
    describe(`happy path`, () => {
      mocks.getTagsByTreeUseCaseExecutionMock.mockReturnValue(Promise.resolve(tagCollection));

      it(
        `executes an use case, changes card details loading state and eventually updates card details data`,
        async () => {
          const { result, waitFor } = renderHook(useTagCollectionPresenter, {
            wrapper: Wrapper,
          });

          act(() => {
            result.current.triggerGetTagsByTree('test-id');
          });

          expect(result.current.tags).toEqual({
            data: null,
            isError: false,
            isLoading: true,
          });

          await waitFor(() => {
            expect(mocks.getTagsByTreeUseCaseExecutionMock).toBeCalledWith({
              treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
            });
          })

          await waitFor(() => {
            expect(result.current.tags).toEqual(expect.objectContaining({
              isLoading: false
            }));
          });

          expect(result.current.tags).toEqual({
            data: tagCollection.map(({ color, id, label }) => ({ color, id, label })),
            isError: false,
            isLoading: false
          });
        }
      );
    });

    it.todo(`errors and invalid data`);
  });
});
