import { TagColor } from './enums';
import Tag from './Tag';

describe(`Tag`, () => {
  describe(`create`, () => {
    it(`creates a tag with default color and label if not given`, () => {
      const tag = new Tag();

      expect(tag.color).toEqual(TagColor.WHITE);
      expect(tag.label).toEqual("");
    });

    it(`creates a tag with given props`, () => {
      const tag = new Tag({
        color: TagColor.RED,
        label: "Tag label"
      });

      expect(tag.color).toEqual(TagColor.RED);
      expect(tag.label).toEqual("Tag label");
    });

    it(`creates a tag with unique id`, () => {
      const tagA = new Tag();
      const tagB = new Tag();

      expect(tagA.id.length).toBeGreaterThan(0);
      expect(tagA.id).not.toEqual(tagB.id);
    });
  });

  describe(`setters`, () => {
    it(`changes the prop value`, () => {
      const initialState = {
        color: TagColor.RED,
        label: "Initial label"
      };

      const tag = new Tag(initialState);

      tag.color = TagColor.WHITE;
      tag.label = "New label";

      expect(tag.color).toEqual(TagColor.WHITE);
      expect(tag.label).toEqual("New label");
    });
  });
});
