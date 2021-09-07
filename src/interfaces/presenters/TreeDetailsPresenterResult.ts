import { Maybe } from '@/common/types';
import ILoadable from '../ILoadable';
import { StoryTreeViewModel } from '../view-models';

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
  treeId: Maybe<string>;
  triggerGetTree: () => void;
  updateTreeNode: (nodeId: string, props: { header?: string, tags?: string[] }) => void;
}
