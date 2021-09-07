import { ContainerContext } from '@/ui/providers';
import { interfaces } from 'inversify';
import { useContext, useMemo } from 'react';

export default function useContainer<T>(moduleSymbol: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(ContainerContext)!;

  return useMemo(() => container?.get<T>(moduleSymbol), [container, moduleSymbol]);;
}
