import { Maybe, UuidType } from '@/common/types';
import StoryTreeViewModel from '../view-models/StoryTreeViewModel';

export default interface GenericCardTeaserTreeProps {
  generateChildrenTreeNodes(nodeId: UuidType, placeBeforeNodeId?: UuidType): void;
  insertTreeNode(
    parentNodeId?: UuidType,
    place?: {
      afterOrBefore: 'after' | 'before';
      nodeId: string;
    }
  ): void;
  removeTreeNode(nodeId: UuidType): void;
  root: Maybe<StoryTreeViewModel>;
  updateTreeNode(nodeId: UuidType, props: { header?: string }): void;
}
