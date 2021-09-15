import { describeCommonStoreSpec } from './common-store-spec';
import { reaction } from 'mobx';
import { StorySummaryDraftPreviewStore } from './StorySummaryDraftPreviewStore';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { StorySummaryDraftMap } from '@/mappers/StorySummaryDraftMap';
import { lorem } from 'faker';
import Tree from '@/entities/Tree';
import StoryCard from '@/entities/StoryCard';
import Tag from '@/entities/Tag';

//      A
//     /\ \
//    B  C D
//   /\  |
//   E F G
const Fixture = (() => {
  const tags = [
    new Tag(),
    new Tag(),
    new Tag()
  ];

  return {
    cards: {
      A: new StoryCard({ header: 'A', tags: [tags[0], tags[1], tags[2]] }),
      B: new StoryCard({ header: 'B', tags: [tags[1]] }),
      C: new StoryCard({ header: 'C' }),
      D: new StoryCard({ header: 'D', tags: [tags[1]] }),
      E: new StoryCard({ header: 'E', tags: [tags[1]] }),
      F: new StoryCard({ header: 'F' }),
      G: new StoryCard({ header: 'G' })
    },
    tags,
    tree: new Tree<StoryCard>()
  };
})();

Fixture.tree.insert(Fixture.cards.A);
Fixture.tree.insert(Fixture.cards.B);
Fixture.tree.insert(Fixture.cards.C);
Fixture.tree.insert(Fixture.cards.D);
Fixture.tree.insert(Fixture.cards.E, Fixture.cards.B.id);
Fixture.tree.insert(Fixture.cards.F, Fixture.cards.B.id);
Fixture.tree.insert(Fixture.cards.G, Fixture.cards.C.id);

describe(`Store: StorySummaryDraftPreviewStore`, () => {
  describeCommonStoreSpec(StorySummaryDraftPreviewStore);

  it(`returns domain model transformed to view model`, () => {
    const store = new StorySummaryDraftPreviewStore();

    const storySummaryDraft = new StorySummaryDraft({
      cards: [
        Fixture.cards.A,
        Fixture.cards.D,
        Fixture.cards.G
      ],
      title: lorem.sentence(),
      tree: Fixture.tree
    });

    reaction(
      () => store.data !== null,
      () => {
        expect(store.data).toEqual(StorySummaryDraftMap.toViewModel(storySummaryDraft));
      }
    );

    store.set({ data: storySummaryDraft });
  });
});
