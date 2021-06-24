import { ReactNode } from 'react';

export default interface IModalContext {
  close(): void;
  open(component: ReactNode): void;
}
