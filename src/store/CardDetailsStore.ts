import { computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { AbstractStore } from './AbstractStore';
import { StoryCardViewModel } from '@/interfaces/view-models';
import { StoryCardMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';

@injectable()
export class CardDetailsStore extends AbstractStore<StoryCard, StoryCardViewModel> {
  constructor() {
    super();

    makeObservable(this);
  }

  @computed
  get data() {
    return this._data ? StoryCardMap.toViewModel(this._data) : null;
  }
}
