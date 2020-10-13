import { ILoadable } from '@/interfaces';
import { useState } from 'react';

export default function useLoadable<T>({
  isLoading = true
}: Partial<ILoadable<T>>): [ILoadable<T>, any] {
  const [status, setStatus] = useState<ILoadable<T>>({
    data: null,
    isError: false,
    isLoading
  });

  return [status, setStatus];
}
