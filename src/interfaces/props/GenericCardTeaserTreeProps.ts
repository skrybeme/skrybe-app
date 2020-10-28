import { Maybe, UuidType } from '@/common/types';
import StoryTreeViewModel from '../view-models/StoryTreeViewModel';

export default interface GenericCardTeaserTreeProps {
  insertTreeNode(parentNodeId: UuidType, placeBeforeNodeId?: UuidType): void;
  nodes: Maybe<StoryTreeViewModel>;
}
