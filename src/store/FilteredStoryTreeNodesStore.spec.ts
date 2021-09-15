import { describeCommonStoreSpec } from './common-store-spec';
import { reaction } from 'mobx';
import { datatype } from 'faker';
import { FilteredStoryTreeNodesStore } from './FilteredStoryTreeNodesStore';

describe(`Store: FilteredStoryTreeNodesStore`, () => {
  describeCommonStoreSpec(FilteredStoryTreeNodesStore);

  it(`returns domain model transformed to view model`, (done) => {
    const store = new FilteredStoryTreeNodesStore();

    const collection = [
      datatype.uuid(),
      datatype.uuid(),
      datatype.uuid()
    ];

    reaction(
      () => store.data && store.data.length,
      (hasData) => {
        if (!hasData) {
          return;
        }

        expect(store.data).toEqual(collection);

        done();
      }
    )

    store.set({ data: collection });
  });
});
