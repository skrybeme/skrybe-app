import { generateUuid } from '@/utils';
import { lorem } from 'faker';
import { StorySummary } from './StorySummary';

describe(`Entity: StorySummary`, () => {
  describe(`property access`, () => {
    it(`returns entity id`, () => {
      const id = generateUuid();

      const entity = new StorySummary(undefined, id);

      expect(entity.id).toEqual(id);
    });

    it(`returns story summary title`, () => {
      const title = lorem.sentence();

      const entity = new StorySummary({ title });

      expect(entity.title).toEqual(title);
    });

    it(`returns story summary body`, () => {
      const body = lorem.paragraph();

      const entity = new StorySummary({ body });

      expect(entity.body).toEqual(body);
    });
  });
});
