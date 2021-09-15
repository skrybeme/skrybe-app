import { IExecutable } from '@/interfaces';
import { IStorySummaryDraftRepo } from '@/interfaces/IStorySummaryDraftRepo';
import { StorySummaryDraftPreviewStore } from '@/store/StorySummaryDraftPreviewStore';
import { StorySummaryDraftStore } from '@/store/StorySummaryDraftStore';

export interface SaveStorySummaryDraftRequest {}

export class SaveStorySummaryDraftUseCase implements IExecutable<never> {
  constructor(
    private _storySummaryDraftRepo: IStorySummaryDraftRepo,
    private _storySummaryDraftPreviewStore: StorySummaryDraftPreviewStore,
    private _storySummaryDraftStore: StorySummaryDraftStore
  ) {}

  async execute(): Promise<void> {
    const storySummaryDraft = this._storySummaryDraftPreviewStore._data;

    if (!storySummaryDraft) {
      this._storySummaryDraftStore.set({
        data: null,
        isError: true,
        isLoading: false
      });

      return;
    }

    const data = await this._storySummaryDraftRepo.save(storySummaryDraft);

    this._storySummaryDraftStore.set({
      data,
      isError: false,
      isLoading: false
    });
  }
}
