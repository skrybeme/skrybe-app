import { MouseEventHandler } from '@/common/types';
import { TagViewModel } from '../view-models';

export default interface CardTeaserProps {
  handleClick?: MouseEventHandler;
  header: string;
  tags?: TagViewModel[];
}
