import StoryTreeViewModel from './StoryTreeViewModel';
import StoryCardViewModel from './StoryCardViewModel';

export default interface StorySummaryDraftViewModel {
  cards: StoryCardViewModel[];
  title?: string;
  tree?: StoryTreeViewModel;
}
