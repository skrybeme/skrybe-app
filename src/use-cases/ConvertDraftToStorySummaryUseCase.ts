import { StorySummary } from '@/entities/StorySummary';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { IAbstractDomainStore, IExecutable, IRepo } from '@/interfaces';

export class ConvertDraftToStorySummaryUseCase implements IExecutable<never> {
  constructor(
    private _storySummaryRepo: IRepo<StorySummary>,
    private _storySummaryDraftDomainStore: IAbstractDomainStore<StorySummaryDraft>,
    private _storySummaryDomainStore: IAbstractDomainStore<StorySummary>
  ) {}

  async execute(): Promise<void> {
    const storySummaryDraft = this._storySummaryDraftDomainStore.data;

    const storySummary = storySummaryDraft?.toStorySummary();

    if (!storySummary) {
      this._storySummaryDomainStore.set({
        data: null,
        isError: true,
        isLoading: false
      });

      return;
    }

    const data = await this._storySummaryRepo.save(storySummary);

    this._storySummaryDomainStore.set({
      data,
      isError: false,
      isLoading: false
    });
  }
}
