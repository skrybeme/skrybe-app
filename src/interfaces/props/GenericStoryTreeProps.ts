import { Maybe, UuidType } from '@/common/types';
import { CSSProperties } from 'styled-components';
import StoryTreeViewModel from '../view-models/StoryTreeViewModel';

export default interface GenericCardTeaserTreeProps {
  generateChildrenTreeNodes(nodeId: UuidType, placeBeforeNodeId?: UuidType): void;
  insertTreeNode(parentNodeId?: UuidType, placeBeforeNodeId?: UuidType): void;
  removeTreeNode(nodeId: UuidType): void;
  root: Maybe<StoryTreeViewModel>;
  style?: CSSProperties;
  updateTreeNode(nodeId: UuidType, props: { header?: string }): void;
}
