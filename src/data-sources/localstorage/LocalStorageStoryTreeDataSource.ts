import { UuidType, AsyncMaybe, Maybe } from '@/common/types';
import { IPersistable } from '@/interfaces';
import { StoryTreeLocalStorageModel } from './models/StoryTreeLocalStorageModel';
import { StoryTreeLocalStorageMap } from './mappers/StoryTreeLocalStorageMap';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export type ILocalStorageStoryTreeDataSource = IPersistable<Tree<StoryCard>>;

export interface ILocalStorageStoryTreeRootDatabase {
  getStoryTreeRootById(id: UuidType): Maybe<StoryTreeLocalStorageModel>;
  getStoryTreeRootCollection(): StoryTreeLocalStorageModel[];
  saveStoryTreeRoot(
    record: StoryTreeLocalStorageModel
  ): StoryTreeLocalStorageModel;
}

export class LocalStorageStoryTreeDataSource implements ILocalStorageStoryTreeDataSource {
  constructor(private _localStorageDatabase: ILocalStorageStoryTreeRootDatabase) {}

  getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
    const record = this._localStorageDatabase.getStoryTreeRootById(id);

    if (!record) {
      return Promise.resolve(null);
    }

    return Promise.resolve(StoryTreeLocalStorageMap.toDomainModel(record));
  }

  getCollection(): Promise<Tree<StoryCard>[]> {
    const collection = this._localStorageDatabase.getStoryTreeRootCollection();

    return Promise.resolve(collection.map(StoryTreeLocalStorageMap.toDomainModel));
  }

  save(entity: Tree<StoryCard>): Promise<Tree<StoryCard>> {
    const record = StoryTreeLocalStorageMap.toLocalStorageModel(entity);

    const result = this._localStorageDatabase.saveStoryTreeRoot(record);

    return Promise.resolve(StoryTreeLocalStorageMap.toDomainModel(result));
  }
}
