import { MouseEventHandler } from '@/common/types';
import { TagViewModel } from '../view-models';

export default interface CardTeaserProps {
  handleClick?: MouseEventHandler;
  header: string;
  isDisabled?: boolean;
  onBlur?: (value: string) => void;
  onFocus?: (value: string) => void;
  tags?: TagViewModel[];
}
