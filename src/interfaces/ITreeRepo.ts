import { AsyncMaybe, UuidType } from '@/common/types';
import IRepo from './IRepo';
import ITree from './ITree';

export default interface ITreeRepo extends IRepo {
  getTreeById(id: UuidType): AsyncMaybe<ITree>;
  save(tree: ITree): AsyncMaybe<ITree>;
}
