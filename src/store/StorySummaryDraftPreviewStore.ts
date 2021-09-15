import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { StorySummaryDraftViewModel } from '@/interfaces/view-models';
import { StorySummaryDraftMap } from '@/mappers/StorySummaryDraftMap';
import { injectable } from 'inversify';
import { computed } from 'mobx';
import { AbstractStore } from './AbstractStore';

@injectable()
export class StorySummaryDraftPreviewStore extends AbstractStore<StorySummaryDraft, StorySummaryDraftViewModel> {
  constructor() {
    super();
  }

  @computed
  get data() {
    return this._data ? StorySummaryDraftMap.toViewModel(this._data) : null;
  }
}
