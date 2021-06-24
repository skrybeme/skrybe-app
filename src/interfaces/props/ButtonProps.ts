import { ReactNode } from 'react';

export default interface ButtonProps {
  children: ReactNode;
  muted?: boolean;
  onClick?: (e: MouseEvent) => void;
  rounded?: boolean;
}
