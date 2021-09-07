import { AsyncMaybe, UuidType } from '@/common/types';
import { IPersistable } from '@/interfaces';
import { IStoryTreeInfoRepo } from '@/use-cases/GetStoryTreeInfoCollectionUseCase';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

export default class StoryTreeInfoRepo implements IStoryTreeInfoRepo {
  constructor(private _dataSource: IPersistable<StoryTreeInfo>) {}

  getById(id: UuidType): AsyncMaybe<StoryTreeInfo> {
    return this._dataSource.getById(id);
  }

  getCollection(): Promise<StoryTreeInfo[]> {
    return this._dataSource.getCollection();
  }

  save(entry: StoryTreeInfo): Promise<StoryTreeInfo> {
    return Promise.resolve(entry);
  }
}
