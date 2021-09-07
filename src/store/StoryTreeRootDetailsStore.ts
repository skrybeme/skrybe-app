import { StoryTreeViewModel } from '@/interfaces/view-models';
import { StoryTreeMap } from '@/mappers';
import { AbstractStore } from './AbstractStore';
import { computed } from 'mobx';
import { injectable } from 'inversify';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

@injectable()
export class StoryTreeRootDetailsStore extends AbstractStore<Tree<StoryCard>, StoryTreeViewModel> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data ? StoryTreeMap.toViewModel(this._data) : null;
  }
}
