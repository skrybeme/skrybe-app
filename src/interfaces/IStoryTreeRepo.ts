import IRepo from './IRepo';
import ITree from './ITree';
import { UuidType } from '@/common/types';

interface IStoryTreeRepo extends IRepo {
  get(id: UuidType): ITree;
}

export default IStoryTreeRepo;
