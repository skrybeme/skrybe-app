import { UuidType, AsyncMaybe } from '@/common/types';

interface IPersistable<T> {
  getById(id: UuidType): AsyncMaybe<T>;
  getCollection(): Promise<T[]>;
  save(entity: T): Promise<T>;
}

export default IPersistable;
