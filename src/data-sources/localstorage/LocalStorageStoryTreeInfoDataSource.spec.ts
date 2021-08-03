import { UuidType } from '@/common/types';
import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { datatype, lorem } from 'faker';
import {
  ILocalStorageStoryTreeInfoDatabase,
  LocalStorageStoryTreeInfoDataSource
} from'./LocalStorageStoryTreeInfoDataSource'
import { StoryTreeInfoLocalStorageModel } from './models/StoryTreeInfoLocalStorageModel';

describe(`LocalStorageStoryTreeInfoDataSource`, () => {
  const storyTreeInfoCollection: StoryTreeInfoLocalStorageModel[] = [
    {
      id: datatype.uuid(),
      title: lorem.sentence()
    },
    {
      id: datatype.uuid(),
      title: lorem.sentence()
    }
  ];

  const localStorageStoryTreeInfoDatabaseMock: ILocalStorageStoryTreeInfoDatabase = {
    getStoryTreeInfoById: jest.fn().mockImplementation((id: UuidType) => {
      const record = storyTreeInfoCollection.find((item) => item.id === id);

      return record || null;
    }),
    getStoryTreeInfoCollection: jest.fn().mockReturnValue(storyTreeInfoCollection),
    saveStoryTreeInfo: jest.fn().mockImplementation(
      (record: StoryTreeInfoLocalStorageModel) => record
    )
  };

  const localStorageTreeInfoDataSource
    = new LocalStorageStoryTreeInfoDataSource(localStorageStoryTreeInfoDatabaseMock);

  describe(`getById`, () => {
    it(`resolves with null if an entity with given id does not exist in database`, () => {
      expect(localStorageTreeInfoDataSource.getById('non-existent-id')).resolves.toBeNull(); 
    });

    it(`resolves with transformed record of an entity with given id`, () => {
      expect(localStorageTreeInfoDataSource.getById(storyTreeInfoCollection[0].id))
        .resolves
        .toEqual(expect.objectContaining({
          id: storyTreeInfoCollection[0].id,
          title: storyTreeInfoCollection[0].title
        }));
    });
  });

  describe(`getCollection`, () => {
    it(`resolves with transformed collection of records`, () => {
      expect(localStorageTreeInfoDataSource.getCollection())
        .resolves
        .toEqual([
          expect.objectContaining({
            id: storyTreeInfoCollection[0].id,
            title: storyTreeInfoCollection[0].title
          }),
          expect.objectContaining({
            id: storyTreeInfoCollection[1].id,
            title: storyTreeInfoCollection[1].title
          })
        ]);
    });
  });

  describe(`save`, () => {
    it(`saves transformed record to provided database`, () => {
      const entity = new StoryTreeInfo({ title: lorem.sentence() });

      localStorageTreeInfoDataSource.save(entity);

      expect(localStorageStoryTreeInfoDatabaseMock.saveStoryTreeInfo).toBeCalledWith({
        id: entity.id,
        title: entity.title
      });
    });

    it(`resolves with persisted record`, () => {
      const entity = new StoryTreeInfo({ title: lorem.sentence() });

      expect(localStorageTreeInfoDataSource.save(entity)).resolves.toEqual(entity);
    });
  });
});
