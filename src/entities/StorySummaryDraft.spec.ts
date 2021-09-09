import { generateUuid } from '@/utils';
import { lorem } from 'faker';
import { StorySummaryDraft } from './StorySummaryDraft';
import StoryCard from './StoryCard';
import Tree from './Tree';

const Fixture = (() => {
  const cards = [
    new StoryCard({
      body: lorem.paragraph(),
      header: lorem.sentence()
    }),
    new StoryCard({
      body: lorem.paragraph(),
      header: lorem.sentence()
    }),
    new StoryCard({
      body: lorem.paragraph(),
      header: lorem.sentence()
    }),
    new StoryCard({
      body: lorem.paragraph(),
      header: lorem.sentence()
    }),
  ];

  const tree = new Tree<StoryCard>();

  cards.forEach((card) => {
    tree.insert(card);
  });

  return { cards, tree };
})();

describe(`Entity: StorySummaryDraft`, () => {
  describe(`property access`, () => {
    it(`returns entity id`, () => {
      const id = generateUuid();

      const entity = new StorySummaryDraft(undefined, id);

      expect(entity.id).toEqual(id);
    });

    it(`returns entity id when it is null`, () => {
      const entity = new StorySummaryDraft();

      expect(entity.id).toBeNull();
    });

    it(`returns story tree`, () => {
      const entity = new StorySummaryDraft({
        cards: [],
        tree: Fixture.tree
      });

      expect(entity.tree!.equals(Fixture.tree)).toBeTruthy();
    });

    it(`returns story summary title`, () => {
      const title = lorem.sentence();

      const entity = new StorySummaryDraft({ cards: [], title });

      expect(entity.title).toEqual(title);
    });

    it(`returns story summary cards`, () => {
      const entity = new StorySummaryDraft({
        cards: Fixture.cards,
        tree: Fixture.tree
      });

      expect(entity.cards).toEqual(Fixture.cards);
    });
  });

  describe(`creation`, () => {
    it(`throws error if creating with cards and no story tree`, () => {
      expect(() => new StorySummaryDraft({ cards: Fixture.cards })).toThrow();
    });

    it(`throws error if creating with cards that are not a part of given story tree`, () => {
      expect(() => new StorySummaryDraft({
        cards: [new StoryCard()],
        tree: Fixture.tree
      })).toThrow();
    });
  });

  describe(`toStorySummary`, () => {
    it(`returns StorySummary object based on draft instance`, () => {
      const draft = new StorySummaryDraft(Fixture, generateUuid());

      const storySummary = draft.toStorySummary();

      expect(storySummary.body).toEqual(Fixture.cards.map(({ body }) => body).join('. '));
      expect(storySummary.title).toEqual(draft.title);
      expect(storySummary.id).not.toEqual(draft.id);
    });
  });

  it.todo(`addCardAfterId`);
  it.todo(`addCardAtIndex`);
  it.todo(`addCardBeforeId`);
  it.todo(`removeCardByIndex`);
  it.todo(`removeCardById`);
});
