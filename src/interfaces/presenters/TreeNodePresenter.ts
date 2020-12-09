import ILoadable from "../ILoadable";
import UIStoryTree from "../UIStoryTree";

export default interface TreeNodePresenter {
  insertTreeNode: (parentNode: UIStoryTree, placeBefore?: UIStoryTree) => void;
  removeTreeNode: (node: UIStoryTree) => void;
  nodes: ILoadable<UIStoryTree>;
}
