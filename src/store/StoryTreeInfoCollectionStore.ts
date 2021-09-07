import { StoryTreeInfoMap } from '@/mappers';
import { AbstractStore } from './AbstractStore';
import { computed } from 'mobx';
import { injectable } from 'inversify';
import { StoryTreeInfoViewModel } from '@/interfaces/view-models';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

@injectable()
export class StoryTreeInfoCollectionStore extends AbstractStore<
  StoryTreeInfo[],
  StoryTreeInfoViewModel[]
> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data ? this._data.map(StoryTreeInfoMap.toViewModel) : null;
  }
}
