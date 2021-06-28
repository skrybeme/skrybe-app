import ILoadable from "../ILoadable";
import { StoryTreeViewModel } from "../view-models";

export default interface TreeDetailsPresenterResult {
  generateChildrenTreeNodes: (
    source: 'body' | 'header',
    nodeId: string,
    placeBeforeNodeId?: string
  ) => void;
  insertTreeNode: (parentNodeId: string, place: {
    afterOrBefore: 'after' | 'before',
    nodeId: string
  }) => void;
  removeTreeNode: (nodeId: string) => void;
  root: ILoadable<StoryTreeViewModel>;
  triggerGetTreeById: (treeId: string) => void;
  updateTreeNode: (nodeId: string, props: { header?: string }) => void;
}
