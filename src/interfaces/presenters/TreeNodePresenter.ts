import { UuidType } from "@/common/types";
import ILoadable from "../ILoadable";
import { StoryTreeViewModel } from "../view-models";

export default interface TreeNodePresenter {
  insertTreeNode: (parentNodeId: UuidType, placeBeforeNodeId?: UuidType) => void;
  removeTreeNode: (id: UuidType) => void;
  nodes: ILoadable<StoryTreeViewModel>;
}
