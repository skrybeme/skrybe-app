import ILoadable from "../ILoadable";
import ITreeNode from "../ITreeNode";
import UIStoryTree from "../UIStoryTree";

export default interface TreeNodePresenter {
  insertTreeNode: (parentNode: UIStoryTree, placeBefore?: UIStoryTree) => void;
  nodes: ILoadable<UIStoryTree>;
}
