import { StoryCardViewModel } from '@/interfaces/view-models';
import { StoryCardMap } from '@/mappers';
import { AbstractStore } from './AbstractStore';
import { computed } from 'mobx';
import StoryCard from '@/entities/StoryCard';

export class CardDetailsStore extends AbstractStore<StoryCard, StoryCardViewModel> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data ? StoryCardMap.toViewModel(this._data) : null;
  }
}
