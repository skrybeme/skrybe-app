import { describeCommonStoreSpec } from './common-store-spec';
import { reaction } from 'mobx';
import { lorem } from 'faker';
import { StoryTreeInfoMap } from '@/mappers';
import { StoryTreeInfoCollectionStore } from './StoryTreeInfoCollectionStore';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

describe(`Store: StoryTreeInfoCollectionStore`, () => {
  describeCommonStoreSpec(StoryTreeInfoCollectionStore);

  it(`returns domain model transformed to view model`, (done) => {
    const store = new StoryTreeInfoCollectionStore();

    const collection = [
      new StoryTreeInfo({ title: lorem.sentence() }),
      new StoryTreeInfo({ title: lorem.sentence() }),
      new StoryTreeInfo({ title: lorem.sentence() })
    ];

    reaction(
      () => store.data && store.data.length,
      (hasData) => {
        if (!hasData) {
          return;
        }

        expect(store.data).toEqual(collection.map(StoryTreeInfoMap.toViewModel));

        done();
      }
    )

    store.set({ data: collection });
  });
});
