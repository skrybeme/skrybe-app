import { StorySummaryDraft } from '@/entities/StorySummaryDraft';
import { StorySummaryDraftViewModel } from '@/interfaces/view-models';
import { StoryCardMap, StoryTreeMap } from '.';

export class StorySummaryDraftMap {
  static toViewModel(domainModel: StorySummaryDraft): StorySummaryDraftViewModel {
    return {
      cards: domainModel.cards.map(StoryCardMap.toViewModel),
      title: domainModel.title,
      tree: domainModel.tree
        ? StoryTreeMap.toViewModel(domainModel.tree) || undefined
        : undefined
    }
  }
}
