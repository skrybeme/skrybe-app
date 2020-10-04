import { UuidType, AsyncMaybe } from '@/common/types';
import { ITree, ITreeDataSource } from '@/interfaces';

export default function createReduxDataSource(): ITreeDataSource {
  return {
    fetchTreeById(id: UuidType): AsyncMaybe<ITree> {
      return Promise.resolve(null);
    },
    save(tree: ITree): AsyncMaybe<ITree> {
      return Promise.resolve(null);
    }
  };
}
