import { ContainerContext } from '@/ui/providers';
import { interfaces } from 'inversify';
import { useContext } from 'react';

export default function useContainer<T>(moduleSymbol: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(ContainerContext)!;

  return container?.get<T>(moduleSymbol);
}
