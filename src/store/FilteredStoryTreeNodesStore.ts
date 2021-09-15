import { UuidType } from '@/common/types';
import { injectable } from 'inversify';
import { computed } from 'mobx';
import { AbstractStore } from './AbstractStore';

@injectable()
export class FilteredStoryTreeNodesStore extends AbstractStore<UuidType[], string[]> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data;
  }
}
