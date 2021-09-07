import { UuidType, AsyncMaybe, Maybe } from '@/common/types';
import { IPersistable, IStoryTreeDataSource } from '@/interfaces';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import { StoryTreeLocalStorageMap } from './mappers/StoryTreeLocalStorageMap';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { StoryTreeDataSourceQuery } from '@/interfaces/IStoryTreeDataSource';
import { ILocalStorageStoryTreeInfoDatabase } from './LocalStorageStoryTreeInfoDataSource';

export interface ILocalStorageStoryTreeRootDatabase {
  getStoryTreeRootById(id: UuidType): Maybe<StoryTreeLocalStorageModel>;
  getStoryTreeRootCollection(): StoryTreeLocalStorageModel[];
  saveStoryTreeRoot(
    record: StoryTreeLocalStorageModel
  ): StoryTreeLocalStorageModel;
}

export class LocalStorageStoryTreeDataSource implements IStoryTreeDataSource {
  constructor(private _localStorageDatabase: ILocalStorageStoryTreeRootDatabase & ILocalStorageStoryTreeInfoDatabase) {}

  getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
    const record = this._localStorageDatabase.getStoryTreeRootById(id);

    if (!record) {
      return Promise.resolve(null);
    }

    const embedded = this._localStorageDatabase.getStoryTreeInfoById(record?.infoId);

    if (!embedded) {
      return Promise.resolve(null);
    }

    return Promise.resolve(StoryTreeLocalStorageMap.toDomainModel(record, embedded));
  }

  getCollection(): Promise<Tree<StoryCard>[]> {
    const collection = this._localStorageDatabase.getStoryTreeRootCollection();

    return Promise.resolve(collection.map((item) => {
      const embedded = this._localStorageDatabase.getStoryTreeInfoById(item?.infoId);

      return StoryTreeLocalStorageMap.toDomainModel(item, embedded!);
    }));
  }

  getOneBy(query: StoryTreeDataSourceQuery): AsyncMaybe<Tree<StoryCard>> {
    const collection = this._localStorageDatabase.getStoryTreeRootCollection();

    const record = collection.find((item) => item.infoId === query.storyTreeInfoId);

    if (!record) {
      return Promise.resolve(null);
    }

    const embedded = this._localStorageDatabase.getStoryTreeInfoById(record?.infoId);

    if (!embedded) {
      return Promise.resolve(null);
    }

    return Promise.resolve(StoryTreeLocalStorageMap.toDomainModel(record, embedded));
  }

  save(entity: Tree<StoryCard>): Promise<Tree<StoryCard>> {
    const record = StoryTreeLocalStorageMap.toLocalStorageModel(entity);

    const result = this._localStorageDatabase.saveStoryTreeRoot(record);

    const embedded = this._localStorageDatabase.getStoryTreeInfoById(record?.infoId);

    return Promise.resolve(StoryTreeLocalStorageMap.toDomainModel(result, embedded!));
  }
}
