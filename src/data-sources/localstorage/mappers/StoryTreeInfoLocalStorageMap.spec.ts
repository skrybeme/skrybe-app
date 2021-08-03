import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { datatype, lorem } from 'faker';
import { StoryTreeInfoLocalStorageModel } from '../models/StoryTreeInfoLocalStorageModel';
import { StoryTreeInfoLocalStorageMap } from './StoryTreeInfoLocalStorageMap';

describe(`StoryTreeInfoLocalStorageMap`, () => {
  describe(`toDomainModel`, () => {
    it(`maps localStorage model to domain model`, () => {
      const input: StoryTreeInfoLocalStorageModel = {
        id: datatype.uuid(),
        title: lorem.sentence()
      };

      const output = StoryTreeInfoLocalStorageMap.toDomainModel(input);

      expect(output.id).toEqual(input.id);
      expect(output.title).toEqual(input.title);
    });
  });

  describe(`toLocalStorageModel`, () => {
    it(`maps domain model to localStorage model`, () => {
      const input = new StoryTreeInfo({
        title: lorem.sentence()
      }, datatype.uuid());

      const output = StoryTreeInfoLocalStorageMap.toLocalStorageModel(input);

      expect(output.id).toEqual(input.id);
      expect(output.title).toEqual(input.title);
    });
  });
});
