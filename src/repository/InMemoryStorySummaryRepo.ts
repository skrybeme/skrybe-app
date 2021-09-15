import { StorySummary } from '@/entities/StorySummary';
import { IRepo } from '@/interfaces';
import { InMemoryRepo } from './InMemoryRepo';

export class InMemoryStorySummaryRepo extends InMemoryRepo<StorySummary> implements IRepo<StorySummary> {}
