import { UuidType } from '@/common/types';
import { datatype, lorem } from 'faker';
import {
  ILocalStorageStoryTreeRootDatabase,
  LocalStorageStoryTreeDataSource
} from './LocalStorageStoryTreeDataSource';
import { StoryTreeInfoLocalStorageModel } from './models/StoryTreeInfoLocalStorageModel';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import { TagColor } from '@/entities/enums';
import { StoryTreeLocalStorageMap } from './mappers/StoryTreeLocalStorageMap';
import {
  defaultStoryTreeRootCollection,
  defaultStoryTreeInfoCollection,
} from './data';
import { ILocalStorageStoryTreeInfoDatabase } from './LocalStorageStoryTreeInfoDataSource';

describe(`LocalStorageStoryTreeDataSource`, () => {
  const rootId = datatype.uuid();
  const firstChildId = datatype.uuid();
  const secondChildId = datatype.uuid();
  const thirdChildId = datatype.uuid();
  const firstGrandchildId = datatype.uuid();
  const secondGrandchildId = datatype.uuid();

  const storyTreeInfoCollection: StoryTreeInfoLocalStorageModel[] = [
    {
      id: datatype.uuid(),
      title: lorem.sentence()
    }
  ];

  const storyTreeRootCollection: StoryTreeLocalStorageModel[] = [
    {
      id: datatype.uuid(),
      infoId: storyTreeInfoCollection[0].id,
      tree: {
        [rootId]: {
          childrenIds: [
            firstChildId,
            secondChildId,
            thirdChildId
          ],
          isRoot: true,
          node: {
            body: lorem.sentence(),
            header: lorem.sentence(),
            id: 'root-id',
            tags: [
              {
                color: TagColor.BLUE,
                id: datatype.uuid(),
                label: lorem.word()
              },
              {
                color: TagColor.PURPLE,
                id: datatype.uuid(),
                label: lorem.word()
              }
            ]
          },
          parentId: ''
        },
        [firstChildId]: {
          childrenIds: [
            firstGrandchildId,
            secondGrandchildId
          ],
          isRoot: false,
          node: {
            body: lorem.sentence(),
            header: lorem.sentence(),
            id: firstChildId,
            tags: []
          },
          parentId: rootId
        },
        [secondChildId]: {
          childrenIds: [],
          isRoot: false,
          node: {
            body: lorem.sentence(),
            header: lorem.sentence(),
            id: secondChildId,
            tags: []
          },
          parentId: rootId
        },
        [thirdChildId]: {
          childrenIds: [],
          isRoot: false,
          node: {
            body: lorem.sentence(),
            header: lorem.sentence(),
            id: thirdChildId,
            tags: []
          },
          parentId: rootId
        },
        [firstGrandchildId]: {
          childrenIds: [],
          isRoot: false,
          node: {
            body: lorem.sentence(),
            header: lorem.sentence(),
            id: firstGrandchildId,
            tags: []
          },
          parentId: firstChildId
        },
        [secondGrandchildId]: {
          childrenIds: [],
          isRoot: false,
          node: {
            body: lorem.sentence(),
            header: lorem.sentence(),
            id: secondGrandchildId,
            tags: []
          },
          parentId: firstChildId
        },
      }
    }
  ];

  const mappedStoryTreeRootCollection
    = storyTreeRootCollection.map((item, index) => StoryTreeLocalStorageMap.toDomainModel(item, storyTreeInfoCollection[index]));

  const localStorageStoryTreeRootDatabaseMock: ILocalStorageStoryTreeRootDatabase & ILocalStorageStoryTreeInfoDatabase = {
    getStoryTreeInfoById: jest.fn().mockImplementation((id: UuidType) => {
      const record = storyTreeInfoCollection.find((item) => item.id === id);

      return record || null;
    }),
    getStoryTreeInfoCollection: jest.fn().mockReturnValue(storyTreeInfoCollection),
    getStoryTreeRootById: jest.fn().mockImplementation((id: UuidType) => {
      const record = storyTreeRootCollection.find((item) => item.id === id);

      return record || null;
    }),
    getStoryTreeRootCollection: jest.fn().mockReturnValue(storyTreeRootCollection),
    saveStoryTreeInfo: jest.fn().mockImplementation(
      (record: StoryTreeInfoLocalStorageModel) => record
    ),
    saveStoryTreeRoot: jest.fn().mockImplementation(
      (record: StoryTreeInfoLocalStorageModel) => record
    )
  };

  const localStorageTreeInfoDataSource
    = new LocalStorageStoryTreeDataSource(localStorageStoryTreeRootDatabaseMock);

  describe(`getById`, () => {
    it(`resolves with null if an entity with given id does not exist in database`, () => {
      expect(localStorageTreeInfoDataSource.getById('non-existent-id')).resolves.toBeNull(); 
    });

    it(`resolves with transformed record of an entity with given id`, async () => {
      const storedTree
        = await localStorageTreeInfoDataSource.getById(storyTreeRootCollection[0].id)!;

      expect(mappedStoryTreeRootCollection[0].equals(storedTree!)).toBeTruthy();
    });
  });

  describe(`getCollection`, () => {
    it(`resolves with transformed collection of records`, async () => {
      const collection = await localStorageTreeInfoDataSource.getCollection();

      expect(collection).toHaveLength(1);

      expect(mappedStoryTreeRootCollection[0].equals(collection[0])).toBeTruthy();
    });
  });

  describe(`save`, () => {
    it(`saves transformed record to provided database`, () => {
      const storyTreeRoot = defaultStoryTreeRootCollection[0];

      localStorageTreeInfoDataSource.save(storyTreeRoot);

      expect(localStorageStoryTreeRootDatabaseMock.saveStoryTreeRoot).toBeCalledWith(
        StoryTreeLocalStorageMap.toLocalStorageModel(storyTreeRoot)
      );
    });

    it(`resolves with persisted record`, async () => {
      const storyTreeRoot = defaultStoryTreeRootCollection[0];

      const storedTree = await localStorageTreeInfoDataSource.save(storyTreeRoot);

      expect(storyTreeRoot.equals(storedTree)).toBeTruthy();
    });
  });
});
