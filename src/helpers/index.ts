import { v4 as uuidv4 } from 'uuid';
import { UuidType } from '@/common/types';

export function generateUuid(): UuidType {
  return uuidv4();
}
