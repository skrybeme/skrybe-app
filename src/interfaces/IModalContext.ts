import { ReactNode } from 'react';

export default interface IModalContext {
  hide(): void;
  show(component: ReactNode): void;
}
