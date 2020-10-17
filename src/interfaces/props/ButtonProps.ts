import { ReactNode } from 'react';

export default interface ButtonProps {
  children: ReactNode;
  muted?: boolean;
  rounded?: boolean;
}
