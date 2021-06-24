import { IModalContext } from '@/interfaces';
import { noop } from '@/utils';
import { createContext } from 'react';

export default createContext<IModalContext>({
  close: noop,
  open: noop
});
