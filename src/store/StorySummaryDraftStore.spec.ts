import { describeCommonStoreSpec } from './common-store-spec';
import { reaction } from 'mobx';
import { lorem } from 'faker';
import { StorySummaryDraftStore } from './StorySummaryDraftStore';
import { StorySummaryDraftMap } from '@/mappers/StorySummaryDraftMap';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

const Fixture = (() => {
  const tree = new Tree<StoryCard>();

  const cards = {
    A: new StoryCard({ header: 'A' }),
    B: new StoryCard({ header: 'B' })
  };

  tree.insert(cards.A);
  tree.insert(cards.B);

  return {
    storySummaryDraft: new StorySummaryDraft({
      cards: Object.values(cards),
      title: lorem.sentence(),
      tree
    })
  };
})();

describe(`Store: StorySummaryDraftStore`, () => {
  describeCommonStoreSpec(StorySummaryDraftStore);

  it(`returns domain model transformed to view model`, (done) => {
    const store = new StorySummaryDraftStore();

    reaction(
      () => store.data,
      (hasData) => {
        if (!hasData) {
          return;
        }

        expect(store.data)
          .toEqual(StorySummaryDraftMap.toViewModel(Fixture.storySummaryDraft));

        done();
      }
    )

    store.set({ data: Fixture.storySummaryDraft });
  });
});
