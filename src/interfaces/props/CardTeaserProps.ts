import { MouseEventHandler } from '@/common/types';
import UITag from '../UITag';

export default interface CardTeaserProps {
  handleClick?: MouseEventHandler;
  header: string;
  tags?: UITag[];
}
