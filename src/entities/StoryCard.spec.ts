import StoryCard from './StoryCard';
import Tag from './Tag';

describe(`StoryCard`, () => {
  describe(`create`, () => {
    it(`creates a card with empty header, body and tags by default`, () => {
      const card = new StoryCard();

      expect(card.body).toEqual("");
      expect(card.header).toEqual("");
      expect(card.tags).toEqual([]);
    });

    it(`creates a card with given props`, () => {
      const initialState = {
        body: "the body",
        header: "the header",
        tags: [new Tag(), new Tag()]
      };

      const card = new StoryCard(initialState);

      expect(card.body).toEqual("the body");
      expect(card.header).toEqual("the header");
      expect(card.tags).toEqual(initialState.tags);
    });

    it(`creates a card with unique id`, () => {
      const cardA = new StoryCard();
      const cardB = new StoryCard();

      expect(cardA.id.length).toBeGreaterThan(0);
      expect(cardA.id).not.toEqual(cardB.id);
    });
  });

  describe(`setters`, () => {
    it(`changes the prop value`, () => {
      const initialState = {
        body: "the body",
        header: "the header"
      };

      const card = new StoryCard(initialState);

      card.body = "new body";
      card.header = "new header";

      expect(card.body).toEqual("new body");
      expect(card.header).toEqual("new header");
    });
  });

  describe(`addTag`, () => {
    it(`adds tag to the card`, () => {
      const card = new StoryCard();
      const tag = new Tag();

      card.addTag(tag);

      expect(card.tags.length).toEqual(1);
      expect(card.tags[0]).toEqual(tag);
    });

    it(`does not allow adding the same tag twice`, () => {
      const card = new StoryCard();
      const tag = new Tag();

      card.addTag(tag);

      expect(() => card.addTag(tag)).toThrow();
    })
  });

  describe(`removeTagById`, () => {
    it(`throws error if given tag does not exist in the card`, () => {
      const card = new StoryCard();
      
      card.addTag(new Tag());

      expect(() => card.removeTagById('invalid-uuid')).toThrow();
    });

    it(`removes given tag from the card`, () => {
      const card = new StoryCard();
      const tag1 = new Tag();
      const tag2 = new Tag();

      card.addTag(tag1);
      card.addTag(tag2);

      card.removeTagById(tag1.id);

      expect(card.tags.length).toEqual(1);
      expect(card.tags).toEqual([
        tag2
      ]);
    });
  });

  describe(`replaceTag`, () => {
    it(`replaces given tag with another one`, () => {
      const card = new StoryCard();

      const oldTag = new Tag();
      const newTag = new Tag();

      card.addTag(oldTag);
      card.replaceTag(oldTag.id, newTag);

      expect(card.tags.length).toEqual(1);
      expect(card.tags[0]).toEqual(newTag);
    });
  });

  describe(`setTags`, () => {
    it(`replaces all tags with provided collection`, () => {
      const card = new StoryCard();

      const oldTags = [new Tag(), new Tag()];

      card.addTag(oldTags[0]);
      card.addTag(oldTags[1]);

      const newTag = new Tag();

      card.setTags([newTag]);

      expect(card.tags.length).toEqual(1);
      expect(card.tags[0]).toEqual(newTag);
    });
  });
});
