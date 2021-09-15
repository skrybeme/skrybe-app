import { UuidType } from '@/common/types';
import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { IStorySummaryDraftRepo } from '@/interfaces/IStorySummaryDraftRepo';
import { InMemoryRepo } from './InMemoryRepo';

export class InMemoryStorySummaryDraftRepo extends InMemoryRepo<StorySummaryDraft & { id: UuidType }> implements IStorySummaryDraftRepo {}