import { AsyncMaybe, UuidType } from '@/common/types';
import { ITree, ITreeRepo, ITreeUseCases } from '@/interfaces';

export default function createTreeUseCases(treeRepo: ITreeRepo): ITreeUseCases {
  return {
    getTreeById(id: UuidType): AsyncMaybe<ITree> {
      return treeRepo.getTreeById(id);
    }
  }
}
