import { UuidType, Maybe } from '@/common/types';
import { defaultStoryTreeInfoCollection, defaultStoryTreeRootCollection } from '../data';
import { ILocalStorageStoryTreeRootDatabase } from '../LocalStorageStoryTreeDataSource';
import {
  ILocalStorageStoryTreeInfoDatabase
} from '../LocalStorageStoryTreeInfoDataSource';
import { StoryTreeInfoLocalStorageMap } from '../mappers/StoryTreeInfoLocalStorageMap';
import { StoryTreeLocalStorageMap } from '../mappers/StoryTreeLocalStorageMap';
import { StoryTreeInfoLocalStorageModel } from '../models/StoryTreeInfoLocalStorageModel';
import { StoryTreeLocalStorageModel } from '../models/StoryTreeLocalStorageModel';

export class LocalStorageDatabase implements ILocalStorageStoryTreeInfoDatabase, ILocalStorageStoryTreeRootDatabase {
  static KEY_STORY_TREE_INFO_COLLECTION = 'collection:story-tree-info';
  static KEY_STORY_TREE_ROOT_COLLECTION = 'collection:story-tree-root';

  constructor() {
    try {
      const rawStoryTreeInfoCollection = JSON.parse(
        localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION)!
      ) as StoryTreeInfoLocalStorageModel[];

      const rawStoryTreeRootCollection  = JSON.parse(
        localStorage.getItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION)!
      );

      rawStoryTreeInfoCollection.map(StoryTreeInfoLocalStorageMap.toDomainModel);
      rawStoryTreeRootCollection.map(StoryTreeLocalStorageMap.toDomainModel);
    } catch (e) {
      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION);
      localStorage.removeItem(LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION);

      const storyTreeInfoCollectionLocalStorageModel = defaultStoryTreeInfoCollection
        .map(StoryTreeInfoLocalStorageMap.toLocalStorageModel);

      const storyTreeRootCollectionLocalStorageModel = defaultStoryTreeRootCollection
        .map(StoryTreeLocalStorageMap.toLocalStorageModel);

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION,
        JSON.stringify(storyTreeInfoCollectionLocalStorageModel)
      );

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify(storyTreeRootCollectionLocalStorageModel)
      );
    }
  }

  getStoryTreeInfoById(id: UuidType): Maybe<StoryTreeInfoLocalStorageModel> {
    return this.getStoryTreeInfoCollection().find((item) => item.id === id) || null;
  }

  getStoryTreeRootById(id: UuidType): Maybe<StoryTreeLocalStorageModel> {
    return this.getStoryTreeRootCollection().find((item) => item.id === id) || null;
  }

  getStoryTreeInfoCollection(): StoryTreeInfoLocalStorageModel[] {
    return JSON.parse(
      localStorage.getItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION
      )!
    ) as StoryTreeInfoLocalStorageModel[];
  }

  getStoryTreeRootCollection(): StoryTreeLocalStorageModel[] {
    return JSON.parse(
      localStorage.getItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION
      )!
    ) as StoryTreeLocalStorageModel[];;
  }

  saveStoryTreeInfo(
    record: StoryTreeInfoLocalStorageModel
  ): StoryTreeInfoLocalStorageModel {
    const collection = this.getStoryTreeInfoCollection();

    const storedItemIndex = collection.findIndex((item) => item.id === record.id);

    if (storedItemIndex < 0) {
      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION,
        JSON.stringify([...collection, record])
      );
    } else {
      collection.splice(storedItemIndex, 1, record);

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_INFO_COLLECTION,
        JSON.stringify(collection)
      );
    }

    return record;
  }

  saveStoryTreeRoot(
    record: StoryTreeLocalStorageModel
  ): StoryTreeLocalStorageModel {
    const collection = this.getStoryTreeRootCollection();

    const storedItemIndex = collection.findIndex((item) => item.id === record.id);

    if (storedItemIndex < 0) {
      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify([...collection, record])
      );
    } else {
      collection.splice(storedItemIndex, 1, record);

      localStorage.setItem(
        LocalStorageDatabase.KEY_STORY_TREE_ROOT_COLLECTION,
        JSON.stringify(collection)
      );
    }

    return record;
  }
}
