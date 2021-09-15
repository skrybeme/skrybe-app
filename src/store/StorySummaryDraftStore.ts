import { AbstractStore } from './AbstractStore';
import { computed } from 'mobx';
import { injectable } from 'inversify';
import { StorySummaryDraftViewModel } from '@/interfaces/view-models';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { StorySummaryDraftMap } from '@/mappers/StorySummaryDraftMap';

@injectable()
export class StorySummaryDraftStore extends AbstractStore<
  StorySummaryDraft,
  StorySummaryDraftViewModel
> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data ? StorySummaryDraftMap.toViewModel(this._data) : null;
  }
}
