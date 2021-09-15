import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { StorySummaryDraftViewModel } from '@/interfaces/view-models';
import { lorem } from 'faker';
import { StoryTreeMap } from '.';
import { StorySummaryDraftMap } from './StorySummaryDraftMap';
import StoryCard from '@/entities/StoryCard';
import StoryTreeInfo from '@/entities/StoryTreeInfo';
import Tree from '@/entities/Tree';
import { generateRandomTags } from '@/helpers';

const Fixture = (() => {
  const title = lorem.sentence();

  const tree = new Tree<StoryCard>({
    info: new StoryTreeInfo({ title })
  });

  const cards = {
    A: new StoryCard({
      body: lorem.sentences(),
      header: lorem.sentence(),
      tags: []
    }),
    B: new StoryCard({
      body: lorem.sentences(),
      header: lorem.sentence(),
      tags: generateRandomTags(1)
    })
  };
  
  tree.insert(cards.A);
  tree.insert(cards.B);

  return {
    cards,
    title,
    tree
  };
})();

describe("StorySummaryDraftMap", () => {
  describe("toViewModel", () => {
    it("maps domain model to view model", () => {
      const input = new StorySummaryDraft({
        cards: [
          Fixture.cards.A,
          Fixture.cards.B,
        ],
        title: Fixture.title,
        tree: Fixture.tree
      });

      const output = StorySummaryDraftMap.toViewModel(input);

      const expectedOutput: StorySummaryDraftViewModel = {
        cards: [
          {
            body: Fixture.cards.A.body,
            header: Fixture.cards.A.header,
            id: Fixture.cards.A.id,
            tags: []
          },
          {
            body: Fixture.cards.B.body,
            header: Fixture.cards.B.header,
            id: Fixture.cards.B.id,
            tags: [
              {
                color: Fixture.cards.B.tags[0].color,
                id: Fixture.cards.B.tags[0].id,
                label: Fixture.cards.B.tags[0].label
              }
            ]
          }
        ],
        title: Fixture.title,
        tree: StoryTreeMap.toViewModel(Fixture.tree)!
      };

      expect(output).toEqual(expectedOutput);
    });
  });
});
