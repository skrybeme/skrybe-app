import { datatype, lorem } from 'faker';
import StoryTreeInfo from "./StoryTreeInfo";

describe(`StoryTreeInfo`, () => {
  describe(`creation`, () => {
    it(`creates a story tree info with given props`, () => {
      const title = lorem.sentence();

      const info = new StoryTreeInfo({ title });

      expect(info.title).toEqual(title);
    });

    it(`creates a story tree info with unique id`, () => {
      const title = lorem.sentence();

      const info1 = new StoryTreeInfo({ title });
      const info2 = new StoryTreeInfo({ title });

      expect(info1.id.length).toBeGreaterThanOrEqual(1);
      expect(info2.id.length).toBeGreaterThanOrEqual(1);
      expect(info1).not.toEqual(info2);
    });

    it(`creates a story tree info with given id`, () => {
      const id = datatype.uuid();
      const title = lorem.sentence();

      const info = new StoryTreeInfo({ title }, id);

      expect(info.id).toEqual(id);
      expect(info.title).toEqual(title);
    });
  });

  describe(`story tree title setter`, () => {
    it(`changes the story tree info title prop`, () => {
      const title = lorem.sentences(1);

      const info = new StoryTreeInfo({ title });

      const updatedTitle = lorem.sentences(2);

      info.title = updatedTitle;

      expect(info.title).toEqual(updatedTitle);
    });
  });
});
