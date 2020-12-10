import { TagColor } from '../entities/enums';
import Tag from '../entities/Tag';
import TagMap from './TagMap';

describe(`TagMap`, () => {
  describe(`toViewModel`, () => {
    it(`maps tag domain object to the view model`, () => {
      const tag = Tag.create(
        {
          color: TagColor.RED,
          label: "Tag label"
        },
        'some-uuid'
      );

      const tagViewModel = TagMap.toViewModel(tag);

      expect(tagViewModel).toEqual({
        color: TagColor.RED,
        id: 'some-uuid',
        label: "Tag label"
      });
    });
  });
});
