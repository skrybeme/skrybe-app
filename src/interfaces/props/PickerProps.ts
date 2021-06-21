import { ReactNode } from 'react';
import IPickerContext from '../IPickerContext';

export default interface PickerProps {
  children: ReactNode;
  isOpen: boolean;
  left?: boolean;
  onClickOutside: (open: IPickerContext['open']) => void;
}
