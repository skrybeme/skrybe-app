import { IGetTreeUseCase } from '@/use-cases/GetTreeUseCase';
import { datatype } from 'faker';
import {
  IFilterStoryTreeRootByLeavesUseCase,
  SummaryGeneratorDomainStore
} from './SummaryGeneratorDomainStore';

const Fixture = (() => {
  const storyTreeInfoId = datatype.uuid();

  const filterStoryTreeRootByLeavesUseCaseMock: IFilterStoryTreeRootByLeavesUseCase = {
    execute: jest.fn()
  };

  const getStoryTreeRootUseCaseMock: IGetTreeUseCase = {
    execute: jest.fn()
  };

  return {
    filterStoryTreeRootByLeavesUseCaseMock,
    getStoryTreeRootUseCaseMock,
    store: new SummaryGeneratorDomainStore(
      filterStoryTreeRootByLeavesUseCaseMock,
      getStoryTreeRootUseCaseMock
    ),
    storyTreeInfoId
  };
})();

describe(`Store: SummaryGeneratorDomainStore`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`getStoryTreeRoot`, () => {
    it(`sets loading state to truthy`, async () => {
      await Fixture.store.getStoryTreeRoot(Fixture.storyTreeInfoId);

      expect(Fixture.store.storyTreeRoot.isLoading).toBeTruthy();
    });

    it(`executes get story tree root by id use case`, async () => {
      expect(Fixture.getStoryTreeRootUseCaseMock.execute).not.toBeCalled();

      await Fixture.store.getStoryTreeRoot(Fixture.storyTreeInfoId);

      expect(Fixture.getStoryTreeRootUseCaseMock.execute).toBeCalledWith({
        storyTreeInfoId: Fixture.storyTreeInfoId
      });
    });

    describe(`when use case succeeds`, () => {
      it.todo(`stores the data`);

      it.todo(`sets loading state to falsy`);
    });

    describe(`when use case fails`, () => {
      it.todo(`does not change stored data`);

      it.todo(`stores info about the error`);

      it.todo(`sets loading state to falsy`);
    });
  });

  describe(`applyLeavesOnly`, () => {
    it.todo(`sets loading state to truthy`);

    it.todo(`executes filter story tree nodes by leaves use case`);

    describe(`when use case succeeds`, () => {
      it.todo(`stores the data`);
    });

    describe(`when use case fails`, () => {
      it.todo(`does not change stored data`);

      it.todo(`stores info about the error`);
    });
  });

  describe(`applyNodes`, () => {
    it.todo(`updates selected story tree nodes`);
  });

  describe(`applyOrder`, () => {
    it.todo(`changes the order of selected story tree node ids`);

    it.todo(`does not change selected story tree nodes despite applied filters`);
  });

  describe(`applyTags`, () => {
    it.todo(`checks story tree nodes with given tags`);
  });
});
