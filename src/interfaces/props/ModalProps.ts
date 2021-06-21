import { ReactNode } from 'react';

export default interface ModalProps {
  children?: ReactNode;
  isVisible?: boolean;
  onClickOutside?: () => void;
}
