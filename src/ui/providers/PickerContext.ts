import { IPickerContext } from '@/interfaces';
import { noop } from '@/utils';
import { createContext } from 'react';

export default createContext<IPickerContext>({
  open: noop,
  openItemName: ''
});
