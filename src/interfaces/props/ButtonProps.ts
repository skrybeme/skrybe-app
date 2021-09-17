import { MouseEventHandler, ReactNode } from 'react';

export default interface ButtonProps {
  children: ReactNode;
  muted?: boolean;
  onClick?: MouseEventHandler;
  rounded?: boolean;
  upper?: boolean;
  variant?: 'primary';
}
