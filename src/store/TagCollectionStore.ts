import { TagViewModel } from '@/interfaces/view-models';
import { TagMap } from '@/mappers';
import { injectable } from 'inversify';
import { computed } from 'mobx';
import { AbstractStore } from './AbstractStore';
import Tag from '@/entities/Tag';

export interface ITagCollectionStore extends AbstractStore<Tag[], TagViewModel[]> {}

@injectable()
export class TagCollectionStore extends AbstractStore<Tag[], TagViewModel[]> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data ? this._data.map(TagMap.toViewModel) : null;
  }
}
