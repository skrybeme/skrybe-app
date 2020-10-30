import { ReactNode } from 'react';

export default interface PopoverProps {
  children: ReactNode;
  isOpen: boolean;
  left?: boolean;
  onClickOutside: () => void;
}
