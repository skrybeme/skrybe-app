import { Maybe } from '@/common/types';
import { CSSProperties } from 'styled-components';
import StoryTreeViewModel from '../view-models/StoryTreeViewModel';

export default interface GenericCardTeaserTreeProps {
  generateChildrenTreeNodes(nodeId: string, placeBeforeNodeId?: string): void;
  insertTreeNode(
    parentNodeId?: string,
    place?: {
      afterOrBefore: 'after' | 'before';
      nodeId: string;
    }
  ): void;
  removeTreeNode(nodeId: string): void;
  root: Maybe<StoryTreeViewModel>;
  style?: CSSProperties;
  updateTreeNode(nodeId: string, props: { header?: string }): void;
}
