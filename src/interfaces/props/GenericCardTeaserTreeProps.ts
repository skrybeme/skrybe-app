import { Maybe } from '@/common/types';
import StoryTreeViewModel from '../view-models/StoryTreeViewModel';

export default interface GenericCardTeaserTreeProps {
  nodes: Maybe<StoryTreeViewModel>;
}
