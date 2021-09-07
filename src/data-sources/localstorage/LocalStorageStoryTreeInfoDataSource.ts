import { AsyncMaybe, Maybe, UuidType } from '@/common/types';
import { IPersistable } from '@/interfaces';
import { StoryTreeInfoLocalStorageMap } from './mappers/StoryTreeInfoLocalStorageMap';
import { StoryTreeInfoLocalStorageModel } from './models/StoryTreeInfoLocalStorageModel';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

export type ILocalStorageStoryTreeInfoDataSource = IPersistable<StoryTreeInfo>;

export interface ILocalStorageStoryTreeInfoDatabase {
  getStoryTreeInfoById(id: UuidType): Maybe<StoryTreeInfoLocalStorageModel>;
  getStoryTreeInfoCollection(): StoryTreeInfoLocalStorageModel[];
  saveStoryTreeInfo(
    record: StoryTreeInfoLocalStorageModel
  ): StoryTreeInfoLocalStorageModel;
}

export class LocalStorageStoryTreeInfoDataSource implements ILocalStorageStoryTreeInfoDataSource {
  constructor(private _localStorageDatabase: ILocalStorageStoryTreeInfoDatabase) {}

  getById(id: UuidType): AsyncMaybe<StoryTreeInfo> {
    const record = this._localStorageDatabase.getStoryTreeInfoById(id);

    if (!record) {
      return Promise.resolve(null);
    }

    return Promise.resolve(StoryTreeInfoLocalStorageMap.toDomainModel(record));
  }

  getCollection(): Promise<StoryTreeInfo[]> {
    const collection = this._localStorageDatabase.getStoryTreeInfoCollection();

    return Promise.resolve(collection.map(StoryTreeInfoLocalStorageMap.toDomainModel));
  }

  save(entity: StoryTreeInfo): Promise<StoryTreeInfo> {
    const record = StoryTreeInfoLocalStorageMap.toLocalStorageModel(entity);

    const result = this._localStorageDatabase.saveStoryTreeInfo(record);

    return Promise.resolve(StoryTreeInfoLocalStorageMap.toDomainModel(result));
  }
}
