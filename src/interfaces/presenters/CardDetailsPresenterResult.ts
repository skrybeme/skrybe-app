import { StoryCardViewModel } from '../view-models';

export default interface CardDetailsPresenterResult {
  card: StoryCardViewModel;
  triggerGetCardById: (cardId: string) => void;
  updateTreeNode: (
    treeId: string,
    nodeId: string,
    props: { body: string, header: string }
  ) => void;
}