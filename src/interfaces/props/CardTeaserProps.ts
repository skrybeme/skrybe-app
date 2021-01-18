import { MouseEventHandler } from '@/common/types';
import { TagViewModel } from '../view-models';

export default interface CardTeaserProps {
  handleClick?: MouseEventHandler;
  handleHeaderChange?: (value: string) => void;
  header: string;
  tags?: TagViewModel[];
}
