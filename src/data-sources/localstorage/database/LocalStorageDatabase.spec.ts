import { LocalStorageDatabase } from './LocalStorageDatabase';
import Tree from '@/entities/Tree';
import StoryCard from '@/entities/StoryCard';
import { StoryTreeLocalStorageMap } from '../mappers/StoryTreeLocalStorageMap';
import { StoryTreeInfoLocalStorageMap } from '../mappers/StoryTreeInfoLocalStorageMap';
import { lorem } from 'faker';
import StoryTreeInfo from '@/entities/StoryTreeInfo';
import { defaultStoryTreeInfoCollection, defaultStoryTreeRootCollection } from '../data';
import { StoryTreeInfoLocalStorageModel } from '../models/StoryTreeInfoLocalStorageModel';

describe(`LocalStorageDatabase`, () => {
  const mockedStoryTreeRoot = new Tree<StoryCard>();
    mockedStoryTreeRoot.insert(new StoryCard());

  const mockedStoryTreeInfo = new StoryTreeInfo({ title: lorem.sentence() });

  const mockedStoryTreeInfoLocalStorageModel
    = StoryTreeInfoLocalStorageMap.toLocalStorageModel(mockedStoryTreeInfo);

  const mockedStoryTreeRootLocalStorageModel
    = StoryTreeLocalStorageMap.toLocalStorageModel(mockedStoryTreeRoot);

  const defaultStoryTreeInfoCollectionLocalStorageModel
    = defaultStoryTreeInfoCollection.map(
      StoryTreeInfoLocalStorageMap.toLocalStorageModel
    );

  const defaultStoryTreeRootCollectionLocalStorageModel
    = defaultStoryTreeRootCollection.map(
      StoryTreeLocalStorageMap.toLocalStorageModel
    );

  describe(`when object is created`, () => {
    it(`populates localStorage with initial data if stored data is corrupted`, () => {
      localStorage.setItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION, 'corrupted!##data');
      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify(mockedStoryTreeRootLocalStorageModel)
      );
  
      new LocalStorageDatabase();
  
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeInfoCollectionLocalStorageModel));
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeRootCollectionLocalStorageModel));
    });

    it(`populates localStorage with initial data if storage is empty`, () => {
      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION);
      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION);

      new LocalStorageDatabase();
  
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeInfoCollectionLocalStorageModel));
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeRootCollectionLocalStorageModel));

      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION);

      new LocalStorageDatabase();
  
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeInfoCollectionLocalStorageModel));
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeRootCollectionLocalStorageModel));
    });

    it(`populates localStorage if stored data is valid but of invalid type`, async () => {
      new LocalStorageDatabase();

      localStorage.setItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION, JSON.stringify({}));

      new LocalStorageDatabase();
  
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeInfoCollectionLocalStorageModel));
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
        .toEqual(JSON.stringify(defaultStoryTreeRootCollectionLocalStorageModel));
    });

    it(`does not populate localStorage if stored data exists and is valid`, async () => {
      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION,
        JSON.stringify([mockedStoryTreeInfoLocalStorageModel])
      );

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify([mockedStoryTreeRootLocalStorageModel])
      );

      new LocalStorageDatabase();
  
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
        .toEqual(JSON.stringify([mockedStoryTreeInfoLocalStorageModel]));
      expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
        .toEqual(JSON.stringify([mockedStoryTreeRootLocalStorageModel]));
    });
  })

  describe(`accessing data`, () => {
    it(`returns story tree info localStorage model by id`, () => {
      const db = new LocalStorageDatabase();

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION,
        JSON.stringify(defaultStoryTreeInfoCollectionLocalStorageModel)
      );

      defaultStoryTreeInfoCollectionLocalStorageModel.forEach((storyTreeInfo) => {
        const result = db.getStoryTreeInfoById(storyTreeInfo.id);

        expect(result).toEqual(storyTreeInfo);
      });
    });

    it(`returns story tree root localStorage model by id`, () => {
      const db = new LocalStorageDatabase();

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify(defaultStoryTreeRootCollectionLocalStorageModel)
      );

      defaultStoryTreeRootCollectionLocalStorageModel.forEach((storyTreeRoot) => {
        const result = db.getStoryTreeRootById(storyTreeRoot.id);

        expect(result).toEqual(storyTreeRoot);
      });
    });

    it(`returns story tree info localStorage model collection`, () => {
      const db = new LocalStorageDatabase();

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION,
        JSON.stringify(defaultStoryTreeInfoCollectionLocalStorageModel)
      );

      const result = db.getStoryTreeInfoCollection();

      expect(result).toEqual(defaultStoryTreeInfoCollectionLocalStorageModel);
    });

    it(`returns story tree root localStorage model collection`, () => {
      const db = new LocalStorageDatabase();

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify(defaultStoryTreeRootCollectionLocalStorageModel)
      );

      const result = db.getStoryTreeRootCollection();

      expect(result).toEqual(defaultStoryTreeRootCollectionLocalStorageModel);
    });
  })

  describe(`persisting data`, () => {
    beforeEach(() => {
      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION);
      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION);
    });

    describe(`when record with given id already exists in the storage`, () => {
      it(`updates story tree info in localStorage collection`, () => {
        const db = new LocalStorageDatabase();
  
        const info = new StoryTreeInfo(
          { title: lorem.sentence() },
          defaultStoryTreeInfoCollectionLocalStorageModel[1].id
        );
  
        const infoLocalStorageModel = StoryTreeInfoLocalStorageMap.toLocalStorageModel(info);
  
        const result = db.saveStoryTreeInfo(infoLocalStorageModel);

        const expectedValue: StoryTreeInfoLocalStorageModel[] = [];
        
        defaultStoryTreeInfoCollectionLocalStorageModel.forEach((item, index) => {
          if (index === 1) {
            expectedValue.push({
              ...item,
              title: info.title
            })
          } else {
            expectedValue.push(item);
          }
        });
  
        expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
          .toEqual(JSON.stringify(expectedValue));
  
        expect(result).toEqual(infoLocalStorageModel);
      });
  
      it(`updates story tree root in localStorage collection`, () => {
        const db = new LocalStorageDatabase();
  
        const tree = new Tree<StoryCard>(
          undefined,
          defaultStoryTreeRootCollectionLocalStorageModel[0].id
        );

        tree.insert(new StoryCard());
  
        const treeLocalStorageModel = StoryTreeLocalStorageMap.toLocalStorageModel(tree);
  
        const result = db.saveStoryTreeRoot(treeLocalStorageModel);

        const expectedValue = [treeLocalStorageModel];
  
        expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
          .toEqual(JSON.stringify(expectedValue));
  
        expect(result).toEqual(treeLocalStorageModel);
      });
    });

    describe(`when record with given id does not exist in the storage`, () => {
      it(`adds story tree info in localStorage collection`, () => {
        const db = new LocalStorageDatabase();
  
        const info = new StoryTreeInfo({ title: lorem.sentence() });
  
        const infoLocalStorageModel = StoryTreeInfoLocalStorageMap.toLocalStorageModel(info);
  
        const result = db.saveStoryTreeInfo(infoLocalStorageModel);
  
        expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION))
          .toEqual(JSON.stringify([
            ...defaultStoryTreeInfoCollectionLocalStorageModel,
            infoLocalStorageModel
        ]));
  
        expect(result).toEqual(infoLocalStorageModel);
      });
  
      it(`adds story tree root in localStorage collection`, () => {
        const db = new LocalStorageDatabase();
  
        const tree = new Tree<StoryCard>();
        tree.insert(new StoryCard());
  
        const treeLocalStorageModel = StoryTreeLocalStorageMap.toLocalStorageModel(tree);
  
        const result = db.saveStoryTreeRoot(treeLocalStorageModel);
  
        expect(localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION))
          .toEqual(JSON.stringify([
            ...defaultStoryTreeRootCollectionLocalStorageModel,
            treeLocalStorageModel
        ]));
  
        expect(result).toEqual(treeLocalStorageModel);
      });
    });
  });
});
