import StoryCard from './StoryCard';
import Tag from './Tag';

describe(`StoryCard`, () => {
  describe(`addTag`, () => {
    it(`adds tag to given node`, () => {
      const node = new StoryCard();
      const tag = new Tag();

      node.addTag(tag);

      expect(node.tags.length).toEqual(1);
    });

    it(`does not allow adding the same tag twice`, () => {
      const node = new StoryCard();
      const tag = new Tag();

      node.addTag(tag);

      expect(() => node.addTag(tag)).toThrow();
    })
  });

  describe(`removeTag`, () => {
    it(`removes given tag from tree node`, () => {
      const node = new StoryCard();
      const tag1 = new Tag();
      const tag2 = new Tag();

      node.addTag(tag1);
      node.addTag(tag2);

      node.removeTag(tag1);

      expect(node.tags.length).toEqual(1);
      expect(node.tags[0]).toEqual(tag2);
    });
  });

  describe(`replaceTag`, () => {
    it(`replaces given tag with another one`, () => {
      const node = new StoryCard();

      const oldTag = new Tag();
      const newTag = new Tag();

      node.addTag(oldTag);
      node.replaceTag(oldTag, newTag);

      expect(node.tags.length).toEqual(1);
      expect(node.tags[0]).toEqual(newTag);
    });
  });

  describe(`setBody`, () => {
    it(`updates body field`, () => {
      const node = new StoryCard();

      node.setBody('test body');

      expect(node.body).toEqual('test body');
    });
  });

  describe(`setHeader`, () => {
    it(`updates header field`, () => {
      const node = new StoryCard();

      node.setHeader('test header');

      expect(node.header).toEqual('test header');
    });
  });
});
