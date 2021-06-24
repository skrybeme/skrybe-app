import { PickerItemClickHandler } from '@/ui/components/types';
import { ReactNode } from 'react';

export default interface PickerItemProps {
    children: ReactNode;
    hoverable?: boolean;
    onClick?: PickerItemClickHandler;
    styleless?: boolean;
  }