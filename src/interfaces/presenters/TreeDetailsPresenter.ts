import { UuidType } from "@/common/types";
import ILoadable from "../ILoadable";
import { StoryTreeViewModel } from "../view-models";

export default interface TreeDetailsPresenter {
  generateChildrenTreeNodes: (nodeId: UuidType, placeBeforeNodeId?: UuidType) => void;
  insertTreeNode: (parentNodeId: UuidType, placeBeforeNodeId?: UuidType) => void;
  removeTreeNode: (nodeId: UuidType) => void;
  root: ILoadable<StoryTreeViewModel>;
  triggerGetTreeById: (treeId: UuidType) => void;
  updateTreeNode: (nodeId: UuidType, props: { header?: string }) => void;
}
